/*------------------------------------------------------------------*/
/*------------------------- SMOOTH SCROLL --------------------------*/
/*-------------------------------------------------------------------

traf.css
tr.af/css
@traf

--------------------------------------------------------------------*/

$(document).ready(function() {

    /*------------------------------------------------------------------*/
    /*------------------------- SMOOTH SCROLL --------------------------*/
    /*------------------------------------------------------------------*/

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top,
                    scrollRight: target.offset().right,
                    scrollBottom: target.offset().bottom,
                    scrollLeft: target.offset().left
                }, 500);
                return false;
            }
        }
    });

    /*------------------------------------------------------------------*/
    /*-------------------------- SLIDE PANEL ---------------------------*/
    /*------------------------------------------------------------------*/

    //open the lateral panel
    $('.panel-trigger').on('click', function(event){
        event.preventDefault();
        $('.panel').addClass('panel-visible');
    });

    //close the lateral panel
    $('.panel').on('click', function(event){
        if( $(event.target).is('.panel') || $(event.target).is('.panel-close') ) { 
            $('.panel').removeClass('panel-visible');
            event.preventDefault();
        }
    });

    /*------------------------------------------------------------------*/
    /*-------------------------- ANIMSITION ----------------------------*/
    /*------------------------------------------------------------------*/

    /* animsition v3.3.1
    /* http://blivesta.github.io/animsition/
    /* Licensed under MIT
    /* Author : blivesta
    /* http://blivesta.com/ */

    (function($) {
        "use strict";
        var namespace = "animsition";
        var methods = {
            init: function(options) {
                options = $.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    touchSupport: true,
                    loading: true,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    unSupportCss: [ "animation-duration", "-webkit-animation-duration", "-o-animation-duration" ],
                    overlay: false,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body"
                }, options);
                var support = methods.supportCheck.call(this, options);
                if (support === false) {
                    if (!("console" in window)) {
                        window.console = {};
                        window.console.log = function(str) {
                            return str;
                        };
                    }
                    console.log("Animsition does not support this browser.");
                    return methods.destroy.call(this);
                }
                var bindEvts = "click." + namespace;
                if (options.touchSupport) {
                    bindEvts += " touchend." + namespace;
                }
                var overlayMode = methods.state.call(this, options);
                if (overlayMode === true) {
                    methods.addOverlay.call(this, options);
                }
                if (options.loading === true) {
                    methods.addLoading.call(this, options);
                }
                return this.each(function() {
                    var _this = this;
                    var $this = $(this);
                    var $window = $(window);
                    var data = $this.data(namespace);
                    if (!data) {
                        options = $.extend({}, options);
                        $this.data(namespace, {
                            options: options
                        });
                        $window.on("load." + namespace + " pageshow." + namespace, function() {
                            methods.pageIn.call(_this);
                        });
                        $window.on("unload." + namespace, function() {});
                        $(options.linkElement).on(bindEvts, function(event) {
                            event.preventDefault();
                            var $self = $(this);
                            methods.pageOut.call(_this, $self);
                        });
                    }
                });
            },
            supportCheck: function(options) {
                var $this = $(this);
                var props = options.unSupportCss;
                var propsNum = props.length;
                var support = false;
                if (propsNum === 0) {
                    support = true;
                }
                for (var i = 0; i < propsNum; i++) {
                    if (typeof $this.css(props[i]) === "string") {
                        support = true;
                        break;
                    }
                }
                return support;
            },
            state: function(options) {
                var $this = $(this);
                var overlayMode;
                if (options.overlay === true || $this.data("animsition-overlay") === true) {
                    overlayMode = true;
                } else {
                    overlayMode = false;
                }
                return overlayMode;
            },
            addOverlay: function(options) {
                $(options.overlayParentElement).prepend('<div class="' + options.overlayClass + '"></div>');
            },
            addLoading: function(options) {
                $(options.loadingParentElement).append('<div class="' + options.loadingClass + '"></div>');
            },
            removeLoading: function() {
                var $this = $(this);
                var options = $this.data(namespace).options;
                var $loading = $(options.loadingParentElement).children("." + options.loadingClass);
                $loading.fadeOut().remove();
            },
            pageInClass: function() {
                var $this = $(this);
                var options = $this.data(namespace).options;
                var thisInClass = $this.data("animsition-in");
                var inClass;
                if (typeof thisInClass === "string") {
                    inClass = thisInClass;
                } else {
                    inClass = options.inClass;
                }
                return inClass;
            },
            pageInDuration: function() {
                var $this = $(this);
                var options = $this.data(namespace).options;
                var thisInDuration = $this.data("animsition-in-duration");
                var inDuration;
                if (typeof thisInDuration === "number") {
                    inDuration = thisInDuration;
                } else {
                    inDuration = options.inDuration;
                }
                return inDuration;
            },
            pageIn: function() {
                var _this = this;
                var $this = $(this);
                var options = $this.data(namespace).options;
                var inClass = methods.pageInClass.call(_this);
                var inDuration = methods.pageInDuration.call(_this);
                var overlayMode = methods.state.call(_this, options);
                if (options.loading === true) {
                    methods.removeLoading.call(_this);
                }
                if (overlayMode === true) {
                    methods.pageInOverlay.call(_this, inClass, inDuration);
                } else {
                    methods.pageInBasic.call(_this, inClass, inDuration);
                }
            },
            pageInBasic: function(inClass, inDuration) {
                var $this = $(this);
                $this.css({
                    "animation-duration": inDuration / 1e3 + "s"
                }).addClass(inClass).animateCallback(function() {
                    $this.removeClass(inClass).css({
                        opacity: 1
                    });
                });
            },
            pageInOverlay: function(inClass, inDuration) {
                var $this = $(this);
                var options = $this.data(namespace).options;
                $this.css({
                    opacity: 1
                });
                $(options.overlayParentElement).children("." + options.overlayClass).css({
                    "animation-duration": inDuration / 1e3 + "s"
                }).addClass(inClass);
            },
            pageOutClass: function($self) {
                var $this = $(this);
                var options = $this.data(namespace).options;
                var selfOutClass = $self.data("animsition-out");
                var thisOutClass = $this.data("animsition-out");
                var outClass;
                if (typeof selfOutClass === "string") {
                    outClass = selfOutClass;
                } else if (typeof thisOutClass === "string") {
                    outClass = thisOutClass;
                } else {
                    outClass = options.outClass;
                }
                return outClass;
            },
            pageOutDuration: function($self) {
                var $this = $(this);
                var options = $this.data(namespace).options;
                var selfOutDuration = $self.data("animsition-out-duration");
                var thisOutDuration = $this.data("animsition-out-duration");
                var outDuration;
                if (typeof selfOutDuration === "number") {
                    outDuration = selfOutDuration;
                } else if (typeof thisOutDuration === "number") {
                    outDuration = thisOutDuration;
                } else {
                    outDuration = options.outDuration;
                }
                return outDuration;
            },
            pageOut: function($self) {
                var _this = this;
                var $this = $(this);
                var options = $this.data(namespace).options;
                var outClass = methods.pageOutClass.call(_this, $self);
                var outDuration = methods.pageOutDuration.call(_this, $self);
                var overlayMode = methods.state.call(_this, options);
                var url = $self.attr("href");
                if (overlayMode === true) {
                    methods.pageOutOverlay.call(_this, outClass, outDuration, url);
                } else {
                    methods.pageOutBasic.call(_this, outClass, outDuration, url);
                }
            },
            pageOutBasic: function(outClass, outDuration, url) {
                var $this = $(this);
                $this.css({
                    "animation-duration": outDuration / 1e3 + "s"
                }).addClass(outClass).animateCallback(function() {
                    location.href = url;
                });
            },
            pageOutOverlay: function(outClass, outDuration, url) {
                var _this = this;
                var $this = $(this);
                var options = $this.data(namespace).options;
                var inClass = methods.pageInClass.call(_this);
                $(options.overlayParentElement).children("." + options.overlayClass).css({
                    "animation-duration": outDuration / 1e3 + "s"
                }).removeClass(inClass).addClass(outClass).animateCallback(function() {
                    $this.css({
                        opacity: 0
                    });
                    location.href = url;
                });
            },
            destroy: function() {
                return this.each(function() {
                    var $this = $(this);
                    $(window).unbind("." + namespace);
                    $this.removeClass(namespace).removeData(namespace);
                });
            }
        };
        $.fn.animateCallback = function(callback) {
            var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
            return this.each(function() {
                $(this).bind(animationEnd, function() {
                    $(this).unbind(animationEnd);
                    return callback.call(this);
                });
            });
        };
        $.fn.animsition = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error("Method " + method + " does not exist on jQuery." + namespace);
            }
        };
    })(jQuery);

    /*------------------------------------------------------------------*/
    /*--------------------------- CENTERED -----------------------------*/
    /*------------------------------------------------------------------*/

    centered();
    function centered(){
        var $centerHorizontal = $('.center-horizontal'),
            $centerVertical = $('.center-vertical');

        $centerHorizontal.each(function(){
            $(this).css('marginLeft', -$(this).outerWidth()/2);
        });
        $centerVertical.each(function(){
            $(this).css('marginTop', -$(this).outerHeight()/2);
        });
        $centerHorizontal.css({
            'display' : 'inline',
            'position' : 'absolute',
            'left' : '50%'
        });
        $centerVertical.css({
            'display' : 'inline',
            'position' : 'absolute',
            'top' : '50%',
        });
    }
    $(window).on('resize', centered);
    $(window).on('load', centered);

    /*------------------------------------------------------------------*/
    /*-------------------------- SIDE MENU -----------------------------*/
    /*------------------------------------------------------------------*/ 


    /* jPushMenu.js
    /* 1.1.1
    /* @author: takien
    /* http://takien.com
    /* Original version (pure JS) is created by Mary Lou http://tympanus.net/ */

    (function($) {

        $.fn.menu = function(customOptions) {
            var o = $.extend({}, $.fn.menu.defaultOptions, customOptions);

            /* add class to the body.*/

            $('body').addClass(o.bodyClass);
            $(this).addClass('menuBtn');
            $(this).click(function() {
                var target         = '',
                    push_direction     = '';


                if($(this).is('.'+o.showLeftClass)) {
                    target         = '.menu-left';
                    push_direction = 'toright';
                }
                else if($(this).is('.'+o.showRightClass)) {
                    target         = '.menu-right';
                    push_direction = 'toleft';
                }
                else if($(this).is('.'+o.showTopClass)) {
                    target         = '.menu-top';
                }
                else if($(this).is('.'+o.showBottomClass)) {
                    target         = '.menu-bottom';
                }


                $(this).toggleClass(o.activeClass);
                $(target).toggleClass(o.menuOpenClass);

                if($(this).is('.'+o.pushBodyClass)) {
                    $('body').toggleClass( 'menu-push-'+push_direction );
                }

                /* disable all other button*/
                $('.menuBtn').not($(this)).toggleClass('disabled');

                return false;
            });
            var menu = {
                close: function (o) {
                    $('.menuBtn,body,.menu').removeClass('disabled active menu-open menu-push-toleft menu-push-toright');
                }
            }

            if(o.closeOnClickInside) {
                $(document).click(function() {
                    menu.close();
                });

                $('.menu,.toggle-menu').click(function(e){
                    e.stopPropagation();
                });
            }

            if(o.closeOnClickOutside) {
                $(document).click(function() { 
                    menu.close();
                }); 

                $('.menu,.toggle-menu').click(function(e){ 
                    e.stopPropagation(); 
                });
            }

            // On Click Link
            if(o.closeOnClickLink) {
                $('.menu a').on('click',function(){
                    menu.close();
                });
            }
        };

        $.fn.menu.defaultOptions = {
            bodyClass       : 'menu-push',
            activeClass     : 'menu-active',
            showLeftClass   : 'menu-left',
            showRightClass  : 'menu-right',
            showTopClass    : 'menu-top',
            showBottomClass : 'menu-bottom',
            menuOpenClass   : 'menu-open',
            pushBodyClass   : 'push-body',
            closeOnClickOutside: true,
            closeOnClickInside: true,
            closeOnClickLink: true
        };
    })(jQuery);


});