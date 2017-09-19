$(document).ready(function () {

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }


    var detectIE = detectIE();
    if (detectIE && detectIE > 10) {
        $('html').addClass('ie').attr('data-ie', detectIE);
    }



    function isiOS() {
        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];

        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) {
                    return true;
                }
            }
        }
        return false;
    }

    if (isiOS) {
        $('html').addClass('ios');
    }


    var windowWidth = getWindowWidth(),
        windowHeight = getWindowHeight();

    $(window).on('resize orientationchange', function () {
        var newWindowWidth = getWindowWidth();
        if (newWindowWidth != windowWidth) {
            windowWidth = newWindowWidth;
            windowHeight = getWindowHeight();

            //fn
            onVisibleSVG($img_topSellingPoints);

        }
    });

    $(window).on('scroll', function () {
        onVisibleSVG($img_topSellingPoints);
    });

    //----------------------------------------------------------------

    function getWindowWidth() {
        return Math.max($(window).width(), window.innerWidth);
    }

    function getWindowHeight() {
        return Math.max($(window).height(), window.innerHeight);
    }

    function isInViewport(el, offset) {
        var offset = offset || 0;
        return el.is(':in-viewport(' + offset + ')') ? true : false;
    }

    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    var $img_topSellingPoints = $('#svg_topSellingPoints');

    function initSVG(svgWrap, handler) {
        if (svgWrap.length) {
            var srcSVG = svgWrap.data('src');
            if (!Modernizr.svg || $('html').hasClass('ie') && $('html').data('ie') < 10 ) {
                srcSVG = srcSVG.replace(".svg", ".png");
                svgWrap.append('<img src="' + srcSVG + '" alt=""/>');
            } else {
                handler(svgWrap, srcSVG);
            }
        }
    }

    function onVisibleSVG(svgWrap) {
        if (svgWrap.length && !svgWrap.hasClass('visible') && isInViewport(svgWrap)) {
            svgWrap.trigger('visible');
        }
    }

    function calcSvgWrapHeight(svgWrap) {
        if ($('html').hasClass('ie') && $('html').data('ie') >= 10 || $('html').hasClass('ios')) {
            svgWrap.addClass('js-svg-height');
            var padBottom = Math.round(100 * parseInt(svgWrap.find('svg').attr('height')) / parseInt(svgWrap.find('svg').attr('width')));
            svgWrap.addClass('svg-absolute').css('padding-bottom', padBottom + '%');
        }
    }

    initSVG($img_topSellingPoints, initSVG_topSellingPoints);
    function initSVG_topSellingPoints(svgWrap, src) {
        var svgCanvas = Snap("#" + svgWrap.attr('id') + "");
        Snap.load(src, onSVGLoaded);

        function onSVGLoaded(svg) {
            svgCanvas.append(svg);
            calcSvgWrapHeight(svgWrap);
            var clouds = svgCanvas.select(".svg_clouds"),
                mountains = svgCanvas.select('.svg_mountains').selectAll("polygon"),
                mountainsInfo = svgCanvas.selectAll(".svg_mountains-info");

            mountains.forEach(function (el, i) {
                el.attr({
                    transform: 'translate(0,150%,0)'
                });
            });
            mountainsInfo.forEach(function (el, i) {
                el.attr({
                    opacity: 0,
                    transition:'opacity .4s ease'
                });
            });

            initAnimateSVG();
            svgWrap.on('visible', function () {
                initAnimateSVG();
                svgWrap.unbind('visible');
            });

            function initAnimateSVG() {
                if (!svgWrap.hasClass('visible') && isInViewport(svgWrap)) {
                    var animate = function (i) {
                        setTimeout(function () {
                            mountains[i].animate({
                                transform: 'none'
                            }, 400, mina.easein, function () {
                                mountainsInfo[i].animate({
                                    opacity: 1
                                }, 1000, mina.backin);
                            });
                        }, 600 * i);
                    };

                    for (var i = 0; i < mountains.length; i++) {
                        animate(i);
                    }

                    svgWrap.addClass('visible');
                }
            }
        }
    }

});




