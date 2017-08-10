/*
===================================================================================================
Author: Jim Getty (jgett@umich.edu)

Created: 2011-07-25

Description: Converts a unordered list to a drop down menu

Examples:
	//using defaults
	$('#menu').menu();
	//use a custom timeout value (1 second)
	$('#menu').menu({ 'timeout': 1000 });
===================================================================================================
*/
(function ($) {
    $.fn.menu = function (options) {

        var defaults = {
            'timeout': 500
        }

        var opt = $.extend({}, defaults, options);

        return this.each(function () {
			var $this = $(this);
			
            if ($this.is('ul')) {
                $this.children('li').bind('mouseover', jsddm_open)
                $this.children('li').bind('mouseout', function () { jsddm_timer(opt); })
                $(document).click(jsddm_close);
            }
        });
    };

    var closetimer = 0;
    var ddmenuitem = 0;

    function jsddm_open() {
        jsddm_canceltimer();
        jsddm_close();
        ddmenuitem = $(this).find('ul').css('visibility', 'visible');
    }

    function jsddm_close() {
        if (ddmenuitem) ddmenuitem.css('visibility', 'hidden');
    }

    function jsddm_timer(o) {
        closetimer = window.setTimeout(jsddm_close, o.timeout);
    }

    function jsddm_canceltimer() {
        if (closetimer) {
            window.clearTimeout(closetimer);
            closetimer = null;
        }
    }
})(jQuery);