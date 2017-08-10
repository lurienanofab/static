/*
===================================================================================================
Author: Jim Getty (jgett@umich.edu)

Created: 2011-06-15

Requires:
    js.cookie.js (https://github.com/js-cookie/js-cookie)
    json2.js (https://github.com/douglascrockford/JSON-js)

Description: Saves the scroll position of an element in localStorage so that the position is maintained
    whenever the page loads. The key option is used to distinguish two elements on the same page.
    The target option is the element for which to maintain scroll position between page loads.

Examples:
    1)  //Maintains scroll position of $(window)
        $.scrollposition();
    2)  //Maintains scroll position of $('#div1')
        $.scrollposition({ key: 'example', target: $('#div1') });

===================================================================================================
*/
(function ($) {
    $.fn.scrollposition = function (options) {
        return this.each(function () {
            var $this = $(this);

            var opt = $.extend({}, { 'key': 'default' }, $this.data(), options);

            var key = 'scrollposition';

            key += "#" + (opt.key || 'default');

            var setPosition = function () {
                var val = localStorage[key];
                if (val) $this.scrollTop(val);
            }

            $this.scroll(function () {
                localStorage[key] = $this.scrollTop()
            });

            setPosition();
        });
    }

    $.scrollposition = function (options) {

        var defaults = {
            'key': 'default',
            'target': $(window)
        }

        var opt = $.extend({}, defaults, options);
        var page = window.location.pathname;

        //make sure we have some usable options
        opt.key = (typeof opt.key == 'string' && opt.key !== '') ? opt.key : 'default';
        opt.target = (typeof opt.target == 'object' && opt.target.jquery) ? opt.target : $(window);

        //get the current scroll position and set the target's scrollTop
        var obj = $.parseJSON(Cookies.get('jquery.scrollposition')) || {};
        obj[page] = obj[page] || {};
        obj[page][opt.key] = obj[page][opt.key] || 0;
        opt.target.scrollTop(obj[page][opt.key]);
        Cookies.set('jquery.scrollposition', JSON.stringify(obj), { 'expires': 7 });

        opt.target.scroll(function () {
            //update the cookie whenever scrolling occurs
            var o = $.parseJSON(Cookies.get('jquery.scrollposition')) || {};
            o[page] = o[page] || {};
            o[page][opt.key] = opt.target.scrollTop();
            Cookies.set('jquery.scrollposition', JSON.stringify(o), { 'expires': 7 });
        });
    };
})(jQuery);