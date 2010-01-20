(function($) {
    $.fn.switchTarget = function (options) {
        var $options = $.extend({}, $.fn.switchTarget.defaults, options);
        var links = [];
        var targets =[];

        return this.each(function(i){
            var activateLink = function(link) {
                link.addClass($options.linkClass); 
                if ($options.linkSwap) {
                    $(links).show();
                    link.hide();
                }
            };

            var $e = $(this);
            var $t = $(this.hash);
            links.push(this);
            targets.push($t.get(0));
            if ($options.startHidden) {
                $(targets).hide();
            }
            if ((i + 1) === $options.linkSelected) {
                activateLink($e);
            }
            else {
                $t.hide();
            }

            $e.bind($options.activation, function() {
                if ($options.activation == 'mouseover') {
                    $e.click(function(){ return false; });
                }  
                if ($options.effect == 'sliding') {
                    if ($($t).is(":visible")) {                        
                        $($t).slideUp($options.speed);
                    }
                    else {
                        $(targets).not($t).slideUp($options.speed);
                        $t.slideDown($options.speed);
                    }
                }
                else {
                    $(targets).not($t).hide($options.speed);
                    $t.show($options.speed);
                }

                $(links).removeClass($options.linkClass);
                activateLink($e);
                return false;
            });
        });
    }

    $.fn.switchTarget.defaults =
    {
        linkSelected    : 1,
        linkClass       : 'selected',
        linkSwap        : false,
        effect          : 'basic', // alternative: 'sliding'
        speed           : '',
        startHidden     : false,
        activation      : 'click' // alternative: 'mouseover', 'dblclick'
    }

})(jQuery);