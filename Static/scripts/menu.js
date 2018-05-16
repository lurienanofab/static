(function($){
    $(document).ready(function(){
        var $this = $(".menu");

        var opt = $.extend({}, {
            "timeUrl": "//ssel-sched.eecs.umich.edu/time.aspx"
        }, $this.data());

        // there are three clocks for lg/md, sm, and xs size screens

        var clocks = $(".clock", $this).servertime({
            "url": opt.timeUrl,
            "autostart": false
        });

        var handleResize = function () {
            clocks.trigger('stop').filter(":visible").trigger("start");
        };

        $(window).on("resize", handleResize);

        handleResize();

        //the bootstrap nav doesn't close after a link is clicked (small screen only) so...
        $this.on("click", ".nav .dropdown .dropdown-menu a", function (e) {
            $(".navbar-toggle:visible", $this).click();
        });
        
        $(window).click(function(e){
            console.log("window-click");
            $(".dropdown.open .dropdown-toggle").collapse();
        });
	});
}(jQuery));