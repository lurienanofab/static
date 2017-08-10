(function ($) {
    $.fn.ajaxbutton = function (options, name, value) {
        return this.each(function () {
            var $this = $(this);

            var clear = function () {
                $this.removeClass('disabled').find('div.spinner').remove();
                $this.data('working', false)
            }

            if (options == "option") {
                switch (name) {
                    case "disabled":
                        if (value) {
                            $this.addClass('disabled');
                            $this.data('working', true);
                        }
                        else
                            clear();
                        break;
                }
                return;
            }

            var opt = $.extend({}, { "disabled": false, "image": "", "onclick": function (e) { } }, options);

            if (!$this.parent().hasClass('ajaxbutton'))
                $this.wrap($('<div/>').addClass('ajaxbutton'));

            var makeSpinner = function () {
                var result = $("<div/>")
                    .addClass("spinner")
                    .html("&nbsp;");
                if (opt.image)
                    result.css("background-image", "url('" + opt.image + "')");
                return result;
            }

            $this.data('working', false);

            if (opt.disabled) {
                $this.addClass('disabled');
                $this.data('working', true)
            }

            $this.css({
                '-moz-border-radius': '0.5em',
                '-webkit-border-radius': '0.5em'
            }).on('click', function (event) {
                event.preventDefault();
                if (!$this.data('working')) {
                    $this.data('working', true)
                    $this.addClass('disabled').append(makeSpinner());
                    opt.onclick({
                        'event': event,
                        'clear': clear
                    });
                }
            });
        });
    }
}(jQuery));