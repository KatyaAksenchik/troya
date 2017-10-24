var slider;
var w_width = Math.max($(window).width(), window.innerWidth),
    w_height = Math.max($(window).height(), window.innerHeight);

//device width detect: 1-desktop;2-tablet;3-mobile;
var deviceType;
function detectDevice() {

    deviceType = 1;

    if (Modernizr.mq('(max-width: 639px)')) {
        deviceType = 4;
    }

    if (Modernizr.mq('(max-width: 767px)')) {
        deviceType = 3;
    }
    if (Modernizr.mq('(min-width: 768px) and (max-width: 979px)')) {
        deviceType = 2;
    }


}

detectDevice();

// function headerHeight() {
//     var heightHeader = Math.max($(".section-header").height(), $(".section-header").outerHeight());
//     return (heightHeader);
// }

//__animation__
function animateVisibleElement() {

    var $element = $(".animated-hidden");

    function dataAnimate(el) {
        if (el.attr("data-animated-m") && deviceType == 3) {
            return (el.data("animated-m"));
        }
        else if (el.attr("data-animated-t") && deviceType == 2) {
            return (el.data("animated-t"));
        }
        else if (el.attr("data-animated-tm") && deviceType > 1) {
            return (el.data("animated-tm"));
        }
        else {
            return (el.data("animated"));
        }
    }

    function startAnimate(el) {
        if (el.attr("data-delay")) {
            var delay = el.attr("data-delay");
            if (!el.hasClass("disabled")) {
                el.css({
                    "-webkit-animation-delay": delay + "ms",
                    "-moz-animation-delay": delay + "ms",
                    "animation-delay": delay + "ms"
                });
            }
        }
        if (el.hasClass("disable")) {
            //setTimeout(function(){
            el.removeClass("animated-hidden").addClass("animated-visible");
            //    alert("as");
            //},delay*10);

        } else {
            el.removeClass("animated-hidden").addClass("animated-visible animated " + dataAnimate(el));
        }
    }

    if ($element.length > 0) {

        var w_scrollTop = $(window).scrollTop();

        $element.each(function () {
            var $thisElement = $(this);

            if (w_scrollTop + w_height >= $thisElement.offset().top + 100) {
                if ($thisElement.hasClass("animated-wrapper")) {
                    $thisElement.find(".animated-hidden").each(function () {
                        startAnimate($(this));
                    });
                    if ($thisElement.attr("data-animated")) {
                        $thisElement.removeClass("animated-hidden").addClass("animated-visible animated " + dataAnimate($thisElement));
                    } else {
                        $thisElement.removeClass("animated-hidden").addClass("animated-visible");
                    }
                }
                else {
                    startAnimate($thisElement);
                }
            }
        });
    }
}

function animateListIcon() {
    if ($(".page").find(".icon-block").length > 0) {
        $(".icon-block").each(function (i) {
            var $thisBlock = $(this);
            $thisBlock.find(".element").each(function (i) {
                $(this)
                    .attr({
                        "data-animated": "fadeIn",
                        "data-delay": i * 50
                    })
                    .addClass("animated-hidden");
            });
        });
    }
    if ($(".page").find(".list-tags").length > 0) {
        $(".list-tags").each(function (i) {
            var $thisBlock = $(this);
            $thisBlock.find(".tag").each(function (i) {
                $(this)
                    .attr({
                        "data-animated": "bounceIn",
                        "data-delay": i * 450
                    })
                    .addClass("animated-hidden");
            });
        });
    }
}


function adaptiveElement() {
    if (deviceType == 3) {
        if ($(".about-description").length !== 0 && $(".about-description").find('.bx-wrapper').length < 1) {
            if (slider) {
                slider.reloadSlider();
            } else {
                slider = $(".about-description .sl-wrp").bxSlider({
                    controls: false
                });
            }
        }
    } else {
        $(".about-description .sl-wrp").removeAttr("style");
        $(".sl-wrp .col").each(function () {
            $(this).removeAttr("style");
        });

        if ($('.about-description').find('.bx-wrapper').length > 0) {
            if (slider) {
                slider.destroySlider();
            }
        }
    }
}

function showSliderScreen(sliderCarousel) {
    var $sliderOption = {
        arrows: false,
        dots: true,
        infinite: true,
        onAfterChange: function (slide, index) {
            //console.log(index);
        }
    };

    if (deviceType == 3) {
        if (!sliderCarousel.hasClass('slick-initialized')) {
            sliderCarousel.slick($sliderOption);
        }

    } else {
        if (sliderCarousel.hasClass('slick-initialized')) {
            sliderCarousel.unslick();
        }
    }
}

function initSupplierSlider() {
    // var $slide = $img-container
}

function showSliderScreenMin(sliderCarousel) {
    var $sliderOption = {
        arrows: false,
        dots: true,
        infinite: true,
        onAfterChange: function (slide, index) {
            //console.log(index);
        }
    };

    if (deviceType == 4) {
        if (!sliderCarousel.hasClass('slick-initialized')) {
            sliderCarousel.slick($sliderOption);
        }

    } else {
        if (sliderCarousel.hasClass('slick-initialized')) {
            sliderCarousel.unslick();
        }
    }
}

function updateSliderScreen(sliderCarousel) {
    var $sliderOption = {
        arrows: false,
        dots: true,
        onAfterChange: function (slide, index) {
            //console.log(index);
        }
    };

// || deviceType == 4
    if (deviceType == 3) {
        if (!sliderCarousel.hasClass('slick-initialized')) {
            sliderCarousel.slick($sliderOption);
        } else {
            sliderCarousel.unslick();
            sliderCarousel.slick($sliderOption);
        }

    } else {
        if (sliderCarousel.hasClass('slick-initialized')) {
            sliderCarousel.unslick();
        }
    }
}

function showSliderComment() {
    var $sliderMain = $(".comment-main").find(".sl-wrp"),
        $sliderInner = $(".slider-comment").find(".sl-wrp");

    if ($sliderMain.length > 0) {
        var $sliderOption = {
            slidesToShow: 1,
            arrows: true,
            dots: true,
            autoplay: 10000,
            appendArrows: $(".buttons-wrapper-comment-main"),
            fade: true,
            responsive: [
                {
                    breakpoint: 1170,
                    settings: {
                        arrows: false
                    }
                }
            ]
        };

        $sliderMain.slick($sliderOption);
    }

    if ($sliderInner.length > 0) {
        var $sliderOption = {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            autoplay: 10000,
            adaptiveHeight: false,
            fade: true
        };

        $sliderInner.slick($sliderOption);
    }

}


function itemListBlock() {
    $(".list-block .item").each(function (i) {
        var $this = $(this);
        if (!$this.parents().hasClass("section-portfolio")) {
            if (i > 3) {
                $this.addClass("hide");
            } else {
                if ($this.hasClass("hide")) {
                    $this.removeClass("hide");
                }
            }
        }
    });
}

function init_isotopeFilterPortfolio() {
    var $containerPortfolio = $('.logo-block.filter-body'),
        isoOptions = {
            itemSelector: '.item',
            layoutMode: 'fitRows'
        };

    if (deviceType < 3) {
        if (!$containerPortfolio.hasClass("isotope")) {
            $containerPortfolio.isotope(isoOptions);
            $containerPortfolio.addClass("isotope");
        }
    } else {
        if ($containerPortfolio.hasClass("isotope")) {
            $containerPortfolio.isotope('destroy');
            $containerPortfolio.removeClass("isotope");
        }
    }
}

function is_mobileFilterPortfolio(thisItem) {
    thisItem.parents(".filter-nav").find(".active").removeClass("active");
    thisItem.addClass("active");
    var attr = thisItem.attr("data-filter").slice(1);
    if (thisItem.is(':first-child')) {
        $(".show-more").show();
        itemListBlock();
    } else {
        $(".filter-body .item").each(function () {
            if ($(this).hasClass(attr)) {
                $(this).removeClass("hide");
                $(".show-more").hide();
            } else {
                if (!$(this).hasClass("hide")) {
                    $(this).addClass("hide");
                }
            }
        });

    }
}

//fix for draggable image height
function dragHeight() {
    var iW = $(".proto-wrap img").width();
    $(".hidder img").width(iW);
}

//init slider for self page

function checkSlider() {
    if (activeSlider == "tablet") {
        $(".adaptive-slider-phone").unslick().hide();
        $(".adaptive-slider-tablet").show().slick({
            slidesToShow: 1,
            dots: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 979,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }
    else if (activeSlider == "phone") {
        $(".adaptive-slider-tablet").unslick().hide();
        $(".adaptive-slider-phone").show().slick({
            slidesToShow: 1,
            dots: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 979,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }
}

function headerFixed() {
    var header = $(".header"),
        windowScroll = $(window).scrollTop();

    if (windowScroll > 0) {
        header.addClass("fixed");
    }
    else {
        header.removeClass("fixed");
    }
}

// function heightHeaderBgFixed() {
//     var attrHeightHeader = $(".section-header").attr("data-height"),
//         heightHeader = headerHeight();
//     if (heightHeader != attrHeightHeader) {
//         $(".section-header").css("background-size", "auto " + heightHeader + "px");
//         $(".section-header").attr("data-height", heightHeader);
//     }
// }

$(function () {

    //heightHeaderBgFixed
    // var heightHeader = headerHeight();
    // $(".section-header").css("background-size", "auto " + heightHeader + "px");
    // $(".section-header").attr("data-height", heightHeader);
    //if (navigator.userAgent.match(/IEMobile/i)) {
    //    $(".section-header").css("background-attachment", "scroll");
    //}


    //form element
    $('body').on("change", ".control-file", function (str) {

        var str = $(this).val();

        if (str.lastIndexOf('\\')) {
            var i = str.lastIndexOf('\\') + 1;
        }
        else {
            var i = str.lastIndexOf('/') + 1;
        }

        var filename = str.slice(i);

        $(this)
            .parents(".file-wrapper").addClass("file-load")
            .find(".file-name").html(filename);

        Drupal.ajax['edit-submitted-file1-upload-button'].eventResponse($(this), 'click');

    });

    $('body').on("click touchstart", ".file-reset", function (e) {

        var wrapper = $(this).parents(".file-wrapper");

        if (wrapper.hasClass("file-load")) {

            var control = wrapper.find(".control-file");

            wrapper
                .removeClass("file-load")
                .find(".file-name").empty();

            control.replaceWith(control = control.clone(true));
        }
        e.preventDefault();
    });

    //$('select').styler();

    $('select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
    });

    $('select').on("select2:open", function (e) {
        $(this).parents(".row-select").addClass("open-select");
    });
    $('select').on("select2:close", function (e) {
        $(this).parents(".row-select").removeClass("open-select");
    });

    $('label.label-radio').on('click', function () {
        if (!$(this).hasClass("checked")) {
            $(this).parents(".radio-block").find("label.label-radio").removeClass("checked");
            $(this).parents(".radio-block").find("input[type='radio']").attr("checked", "");
            $(this).addClass("checked");
            $(this).find("input[type='radio']").attr("checked", "checked");
        }
        return false;
    });

    //list-block
    function visibleItemListBlock() {

        var $item = $(".list-block .item"),
            num = 0,
            lengthItem = $item.length;

        if (!$item.parents().hasClass("section-portfolio")) {

            $item.each(function (hide) {
                if ($(this).hasClass("hide")) {
                    num = hide;
                    return false;
                }
            });

            for (var i = num; i <= num + 3; i++) {
                $item.eq(i).removeClass("hide");
            }

            $(".list-block .show-more").show();

            if (num + 4 >= lengthItem) {
                $(".list-block .show-more").hide();
            }
        }
    }

    $("body").on("click", ".list-block .show-more", function (e) {
        visibleItemListBlock();
        e.preventDefault();
    });


    $("body").on("click", ".list-tags .tag-remove", function (e) {
        var $this = $(this);

        $this.parents(".tag").addClass("animated fadeOut").remove();
    });

    //slider init
    activeSlider = $(".adaptive-filter .item.active").data("slider");

    slider = $(".about-description .sl-wrp").bxSlider({
        controls: false
    });

    $(".partners .sl-wrp").slick({
        slidesToShow: 5,
        adaptiveHeight: false,
        draggable: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    draggable: true,
                    swipe: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    draggable: true
                }
            },
            {
                breakpoint: 979,
                settings: {
                    slidesToShow: 3,
                    centerMode: false,
                    draggable: false
                }
            },
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 3,
                    centerMode: false,
                    draggable: false
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    centerMode: false,
                    draggable: false
                }
            }
        ]
    });

    //comments Slider

    showSliderComment();

    $(".comment").find(".user-photo").on("click", function () {
        if ($(this).parents(".slick-slide").hasClass("slick-active") && !$(this).parents(".slick-slide").hasClass("slick-center")) {
            if ($(this).parents(".slick-slide").next("").hasClass("slick-center")) {
                $(".comment").find(".sl-wrp").slickPrev();
            } else {
                $(".comment").find(".sl-wrp").slickNext();
            }
        }
        return false;
    });

    //slider DEVICEs
    var $sliderDevice = $(".slider-device"),
        optionSlider = {
            slidesToShow: 1,
            dots: false,
            arrows: true,
            adaptiveHeight: true,
            appendArrows: $sliderDevice.find(".sl-control").children(".container"),

            responsive: [
                {
                    breakpoint: 979,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        };

    if ($sliderDevice.length > 0) {
        if ($sliderDevice.hasClass("slide-three")) {

            var arr = ["slide-left", "slide-center", "slide-right"],
                arrLength = arr.length;

            function removeClasses(thisSlide) {
                for (var cl = 0; cl <= arrLength; cl++) {
                    if (thisSlide.hasClass(arr[cl])) {
                        thisSlide.removeClass(arr[cl]);
                        //console.log("removeClasses", arr[cl]);
                    }
                }
            }

            function searchCenterSlide() {
                if ($sliderDevice.find(".slick-active").length == 3) {
                    $sliderDevice.find(".slick-active").each(function (i) {
                        if (!$(this).hasClass(arr[i])) {
                            $(this).addClass(arr[i]);


                        }
                    });
                } else {
                    $sliderDevice.find(".slick-slide").each(function (i) {
                        removeClasses($(this));
                    });
                }
                //console.log($sliderDevice.find(".slick-active").length);
            }

            function click_searchCenterSlide() {
                if ($sliderDevice.find(".slick-active").length == 3) {
                    $sliderDevice.find(".slick-slide").each(function (i) {
                        removeClasses($(this));

                    });
                    $sliderDevice.find(".slick-active").each(function (i) {
                        if ($(this).hasClass("slick-active")) {
                            $(this).next().addClass(arr[i]);
                            //console.log("есть next");
                            //console.log($(this).next().addClass(arr[i]));

                        }
                    });
                }
            }

            $sliderDevice.find(".sl-wrp").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                swipe: false,
                dots: false,
                arrows: true,
                appendArrows: $sliderDevice.find(".sl-control").children(".container"),
                onAfterChange: function (slickSlider, i) {
                    searchCenterSlide();
                },
                onBeforeChange: function (slickSlider, i) {
                    click_searchCenterSlide();
                },

                responsive: [
                    {
                        breakpoint: 979,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true,
                            swipe: true,
                            onBeforeChange: function (slickSlider, i) {
                                //if ($sliderDevice.hasClass("slide-three-init")) {
                                //    $sliderDevice.removeClass("slide-three-init");
                                //}
                            }
                        }
                    }
                ]
            });

            searchCenterSlide();

        }
        else if ($sliderDevice.hasClass("slider-few")) {
            $sliderDevice.find(".slider-block").find(".active").slick(optionSlider);
        }
        else {
            $sliderDevice.find(".sl-wrp").slick(optionSlider);
        }
    }


    //filter slider DEVICEs
    $(".slider-device .filter-block").on("click", ".item", function () {
        var $this = $(this),
            $slider = $this.parents(".slider-device"),
            $filterSlider = $slider.find(".filter-block"),
            $bodySlider = $slider.find(".slider-block"),
            attr = $this.attr("data-item"),
            arr = ["slider-ipad", "slider-iphone", "slider-desctop"],
            arrLength = arr.length;

        if (!$this.hasClass("active")) {

            $filterSlider.find(".active").removeClass("active");
            $this.addClass("active");

            if ($slider.hasClass("slider-few")) {

                $bodySlider.find(".sl-wrp.active").unslick();

                $bodySlider.find(".active").removeClass("active");
                $bodySlider.find(".sl-wrp." + attr + "")
                    .addClass("active")
                    .slick(optionSlider);

                console.log(attr);
            } else {
                for (var iClass = 0; iClass <= arrLength; iClass++) {
                    if ($slider.hasClass(arr[iClass])) {
                        $slider.removeClass(arr[iClass]);
                    }
                }
                $slider.addClass(attr);
            }
        }
    });

    $(".details-slider .sl-wrp").slick({
        slidesToShow: 1,
        dots: false,
        appendArrows: $(".details-slider .sl-control .container"),
        responsive: [
            {
                breakpoint: 979,
                settings: {
                    arrows: false,
                    dots: true,
                }
            }
        ]
    });


    function initSampleSlider(widget) {
        var slider = $(widget).find(".sample-slider .sl-wrp");

        slider.slick({
            slidesToShow: 1,
            dots: true,
            // appendArrows: $(".sample-slider .sl-control .container"),
            appendArrows: $(widget).find(".sample-slider .sl-control .container"),
            adaptiveHeight: false,
            responsive: [
                {
                    breakpoint: 979,
                    settings: {
                        arrows: false,
                        adaptiveHeight: true
                    }
                }
            ]
        });
    }

    initSampleSlider(".logos .section-merch");
    initSampleSlider(".logos .section-stickers");
    initSampleSlider(".knights .section-details");


    $('.swiper-container').swiper({
        slidesPerView: 'auto',
        calculateHeight: true,
        grabCursor: true
    });

    showSliderScreen($(".our-projects-imgs"));
    showSliderScreen($(".icon-block .sl-wrp"));
    showSliderScreen($(".section-portfolio .logo-block .sl-wrp"));
    showSliderScreen($(".stilgiyin .section-responsive .img"));

    // init Isotope
    var $containerPortfolio = $('.logo-block.filter-body'),
        $filterPortfolio = $('.filter-nav');

    $filterPortfolio.on('click', '.item', function () {
        if ($(".filter-body").hasClass("isotope")) {
            var filterValue = $(this).attr('data-filter');
            $containerPortfolio.isotope({
                filter: filterValue,
                itemSelector: ".item"
            });
        }
    });

    $filterPortfolio.each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.find(".item").first().addClass('active');
        $buttonGroup.on('click', '.item', function () {
            if ($(".filter-body").hasClass("isotope")) {
                if (!$(this).hasClass(".active")) {
                    $buttonGroup.find('.active').removeClass('active');
                    $(this).addClass('active');
                }
            } else {
                is_mobileFilterPortfolio($(this));
            }
        });
    });

    adaptiveElement();
    itemListBlock();
    //footer
    $(".footer .toggle").on("click", function () {
        var eH = $(this).data("id");
        $("." + eH).toggleClass("opened").slideToggle("slow");
        $(this).toggleClass("opened");
    });

    //nav
    $(".mob-toggle").on("click", function () {

        $("#menuMobile").modal("toggle");
    });


    function hoverOnSlickBtnsMobile() {
        var $slider = $(".partners"),
            $navbtns = $slider.find(".slick-prev, .slick-next");

        if ($("html").hasClass("touch")) {
            $navbtns.on("touchstart", function (e) {
                    $(this).addClass('hover-slick-click');
                }
            );
            $navbtns.on("touchend", function (e) {
                $(this).removeClass('hover-slick-click');
            });

        }
    }

    hoverOnSlickBtnsMobile();


    //fixed for header and modal window in the detail project pages
    //open
    $('#menuMobile').on('show.bs.modal', function (e) {
        if ($("body").children(".header").length) {
            $("body").addClass("page-project");
        }
    });
    //closed
    $('#menuMobile').on('hidden.bs.modal', function (e) {
        if ($("body").hasClass("page-project")) {
            $("body").removeClass("page-project");
        }
    });

    //animateListIcon
    animateListIcon();

    //draggable width image
    $('.proto-device').find('.draggable').draggable({
        axis: 'x',
        containment: "parent",
        drag: function () {
            $('.proto-device').find('.hidder').css('width', $('.proto-device').find(".draggable").css('left'));
        }
    });

    $(".adaptive-filter .item").on("click", function () {
        activeSlider = $(this).data("slider");
        $(".adaptive-filter .item").removeClass("active");
        $(this).addClass("active");
        checkSlider();
    });

    var rand = 1;
    var randLength = $(".sort-block img").length;
    //console.log(randLength);
    $(".random").on("click", function () {
        if (rand < randLength) {
            rand += 1;
            $(".sort-block img").animate({"opacity": 0}).hide();
            $(".sort-block img").eq(rand - 1).show().animate({"opacity": 1});
            //console.log(rand);
        }

        if (rand == randLength) {
            rand = 0;
        }

    });

    dragHeight();
    checkSlider();

    $('form').find("input").each(function (e) {
        $(this).placeholder();
    });
    $('form').find("textarea").each(function (e) {
        $(this).placeholder();
    });

    $('.zoom-block').find("img").magnify();

    function startVideoMobile() {
        var $videobtn = $(".play-video-btn"),
            $video = $videobtn.prev("video");

        $videobtn.on("click", function () {
            $video[0].play();
            $videobtn.hide();
        })
    }

    startVideoMobile();

    //
    // function initParallaxBg() {
    //     var $page = $(".spacediscovery"),
    //         $bg = $page.find(".parallax-bg");
    //
    //     if ($page.length > 0) {
    //         $bg.parallaxify();
    //     }
    // }
    //
    // initParallaxBg();


});

function initMainBackground() {
    var $widget = $("#particles-js"),
        $background = $widget.find(".particles-js-canvas-el");

    // console.log($background.length);
    if ($('#particles-js').length > 0) {
        if (deviceType !== 3) {
            if ($background.length == 0) {
                particlesJS('particles-js',
                    {
                        "particles": {
                            "number": {
                                "value": 280,
                                "density": {
                                    "enable": true,
                                    "value_area": 1000
                                }
                            },
                            "color": {
                                "value": "#ffffff"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.2,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1.5,
                                    "opacity_min": 0,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 3,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 100,
                                "color": "#ffffff",
                                "opacity": 0.2,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 2,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 600
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "grab"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 140,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 2
                                },
                                "repulse": {
                                    "distance": 200,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    }
                );
            }
        }
        else {
            if ($background.length > 0) {
                $background.remove();
            }
        }
    }
}

var $cupSrcString = " ";

function detectCupAnimationSrc() {
    var $page = $(".cumberland"),
        $cup = $page.find(".cup-animation"),
        $cupSrc = $cup.attr('src');

    if ($page.length > 0) {
        $cupSrcString = $cupSrc.substring(0, $cupSrc.length - 5);
    }
}

function initCupAnimation() {
    var $page = $(".cumberland"),
        $cup = $page.find(".cup-animation");

    var iterations = 0,
        w_scrollTop = $(window).scrollTop();

    if ($page.length > 0 && w_scrollTop + w_height >= $cup.offset().top + 100) {
        if ($cup.hasClass("animated-cup")) {
            $cup.removeClass("animated-cup");
            setTimeout(function () {
                var interval = setInterval(animation, 100);

                function animation() {
                    iterations++;
                    if (iterations >= 13)
                        clearInterval(interval);
                    $cup.attr('src', $cupSrcString + iterations + ".png");
                }
            }, 2000);
        }
    }

}


//detect when animation end and add background

function detectEndedAnimation() {
    var $block = $(".our-projects-imgs"),
        $box = $block.find(".prj-img-block:last-child");

    $box.on('animationend', function (e) {
        if (deviceType == 1) {
            $block.addClass("colored-bg");
        } else {
            $block.removeClass("colored-bg");
        }
    });
}


$(window).on('resize orientationchange', function () {
    if (Math.max($(window).height(), window.innerHeight) != w_height || Math.max($(window).width(), window.innerWidth) != w_width) {

        w_width = Math.max($(window).width(), window.innerWidth);
        w_height = Math.max($(window).height(), window.innerHeight);

        detectDevice();
        // headerHeight();
        // heightHeaderBgFixed();
        adaptiveElement();
        initMainBackground();

        showSliderScreen($(".our-projects-imgs"));
        showSliderScreen($(".icon-block .sl-wrp"));
        showSliderScreen($(".section-portfolio .logo-block .sl-wrp"));
        showSliderScreen($(".stilgiyin .section-responsive .img"));


        if (deviceType < 3) {
            $(".footer-col, .f-contact").removeAttr("style");
            $("#menuMobile").removeAttr("style");
            $("body").removeClass("modal-open");
        }

        showSliderComment();
        init_isotopeFilterPortfolio();
        dragHeight();
        //animate
        animateVisibleElement();


        var arr = ["slide-left", "slide-center", "slide-right"],
            arrLength = arr.length;
        if ($(".slider-device").find(".slick-active").length == 3) {
            $(".slider-device").find(".slick-active").each(function (i) {
                if (!$(this).hasClass(arr[i])) {
                    $(this).addClass(arr[i]);
                }
            });
        } else {
            $(".slider-device").find(".slick-slide").each(function (i) {
                for (var cl = 0; cl <= arrLength; cl++) {
                    if ($(this).hasClass(arr[cl])) {
                        $(this).removeClass(arr[cl]);
                    }
                }
            });
        }


    }

});

$(window).on("load", function () {
    dragHeight();
    init_isotopeFilterPortfolio();
    //animate
    animateVisibleElement();
    updateSliderScreen($(".section-portfolio .logo-block .sl-wrp"));
    initMainBackground();
    // heightHeaderBgFixed();
    detectCupAnimationSrc();
});

$(window).on("scroll", function () {
    //animate
    animateVisibleElement();
    headerFixed();
    // heightHeaderBgFixed();
    detectEndedAnimation();
    initCupAnimation();
});




