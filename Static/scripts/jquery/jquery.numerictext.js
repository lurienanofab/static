/*
===================================================================================================
Author: Jim Getty (jgett@umich.edu)

Created: 2011-06-14

Description: Forces textboxes to be "numeric only" using two methods: 1) block invalid keystrokes
    using the keydown event, 2) check the textbox value after the keypress or change events and
    force it to be numeric. In most cases a standard invalid key is entered and blocked. When this
    fails a brute-force cleaning of the text forces it to be numeric. Options can be used to allow
    decimals and negitive numbers, and to specify callbacks. Using the two methods together solves
    the problem of the user pasting in non-numeric text. The first method is only used to prevent
    the invalid character from briefly appearing in the textbox and then quickly disappearing. This
    happens in the second method but the first method covers the most common invalid characters.

Examples:
    1)  //using defaults
        $('.numeric-text').numerictext();
    2)  //with all options set
        $('.numeric-text').numerictext({
            'integer': false,   //allow decimal
            'positive': false,  //allow negative
            'onforce': function(eventObject) { },   //function to execute after force
            'onblock': function(eventObject) { }    //function to execute after block
        });
===================================================================================================
*/
(function ($) {
    $.fn.numerictext = function (options) {

        var defaults = {
            'integer': true,
            'positive': true,
			'max': null,
			'min': null,
            'onforce': null,
            'onblock': null
        }

        var opt = $.extend({}, defaults, options);

        return this.each(function () {
            if ($(this).is('input:text')) {
                $(this).keydown(function (e) {
                    //block the easy stuff here based on e.which, everything else will get cleaned up by ForceNumeric

                    var key = null;

                    var special = {
                        shift: { 32: '[SPACE]', 48: ')', 49: '!', 50: '@', 51: '#', 52: '$', 53: '%', 54: '^', 55: '&', 56: '*', 57: '(', 59: ':', 106: '*', 107: '+', 109: '_', 111: '/', 188: '<', 190: '>', 191: '?', 192: '~', 219: '{', 220: '|', 221: '}', 222: '"' },
                        noshift: { 32: '[SPACE]', 59: ';', 107: '=', 106: '*', 109: '-', 111: '/', 188: ',', 191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: "'" }
                    };

                    if ((e.which in special.shift) && e.shiftKey)
                        key = special.shift[e.which];
                    else if ((e.which in special.noshift) && !e.shiftKey)
                        key = special.noshift[e.which];
                    else if ((e.which >= 65 && e.which <= 90))
                        key = String.fromCharCode(e.which + (e.shiftKey ? 0 : 32));
										
										if (!opt.positive)
											key = (key == '-') ? null : key;
										
                    if (key) {
                        e.preventDefault();
                        //if (console) console.log('e.which: ' + e.which + ', key: ' + key);
                        if (opt.onblock && typeof opt.onblock == 'function') opt.onblock({ 'sender': $(this), 'data': { 'key': key, 'event': e} });
                    }
                });
                $(this).keyup(function (e) {
                    ForceNumeric(opt, { 'name': 'keyup', 'event': e }, $(this));
                });
                $(this).change(function (e) {
                    ForceNumeric(opt, { 'name': 'change', 'event': e }, $(this));
                });
            }
        });
    };

    function ForceNumeric(o, event, txt) {
        //prevents alpha chars
        var temp = txt.val();
        var num;
        var result;
        var done = false;

        //three special cases: empty, minus sign, and decimal
        if (temp == "") {
            result = "";
            done = true;
        }

        if (temp == "-") {
            if (o.positive) { result = ""; }
            else { result = temp; }
            done = true;
        }

        if (temp == ".") {
            if (o.integer) { result = ""; }
            else { result = temp; }
            done = true;
        }

        if (!done) {
            //if we make it to here the input string is not empty and is not a single char equal to '-' or '.'
            //now we have to see it it is numeric.

            //remove chars until temp is a number or is empty
            while (isNaN(temp) && temp.length > 0) {
                temp = temp.substr(0, temp.length - 1);
            }

            //trim leading zeros, but allow '0.' and '0'
            while (temp.substr(0, 1) == "0" && temp.length > 0 && temp != "0." && temp != "0") {
                temp = temp.substr(1);
            }

            if (temp.length == 0) {
                //temp was reduced to nothing
                result = "";
            }
            else {
                //we need to save the decimal part because if the input ends with '.' or '.0', '.00', etc the decimal and everything after will get chopped off by parseFloat and we need to preserve it

                //find out if the last char is a decimal (remember, we won't get here if the only char is a decimal)
                var dec = (temp.match('\\d+\\.$')) ? '.' : '';

                //also check to see if the string ends with a decimal followed by one or more zeros (we could be building a small fraction like 0.00001)
                //(this won't find a match if the input ends with just a '.')
                var matches = temp.match('(\\.0+)$');
                if (matches && matches.length > 1) {
                    dec = matches[1]
                }

                //if (console) console.log('dec: ' + dec);

                //if we make it here we know temp is definitely a number
                val = parseFloat(temp);

                //check to see if it must be positive
                if (o.positive && val < 0) {
                    val = -1 * val;
                }

								if (o.min){
									if (parseFloat(o.min) + '' == o.min + ''){
										if (val < parseFloat(o.min)) val = parseFloat(o.min);
									}
								}
								
								if (o.max){
									if (parseFloat(o.max) + '' == o.max + ''){
										if (val > parseFloat(o.max)) val = parseFloat(o.max);
									}
								}
								
                //check to see if it must be an integer
                if (o.integer)
                    result = parseInt(Math.round(val)) + '';
                else
                    result = val + dec;
            }
        }

        txt.val(result);

        if (o.onforce && typeof o.onforce == 'function') o.onforce({ 'sender': txt, 'data': { 'event': event} });
    }
})(jQuery);