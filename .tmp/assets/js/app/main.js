var currentSlide = {};

var background = $('.background'),
    middlebg = $('.middlebackground'),
    middleground = $('.middleground'),
    middlefg = $('.middleforeground'),
    foreground = $('.foreground');

//var hanselAndGretel = {
//    page1: {
//        title: 'Kids In the Woods',
//        content: 'Once upon a time there was blah blah blah blah blah',
//        foreground: {
//            // img + class for grid positioning
//        },
//        middleforeground: {
//            // img + class for grid positioning
//        },
//        middleground: {
//            // img + class for grid positioning
//        },
//        middlebackground: {
//            // img + class for grid positioning
//        },
//        background: {
//            // img + class for grid positioning
//        }
//    }
//}

function startParallax() {
    $('.current > #scene').parallax({
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 15,
        scalarY: 20,
        originX: 0.5,
        originY: 0.5
    });
}

function fadeInStart() {
    currentCheck();
    startParallax();
    
    var tl = new TimelineLite();
    tl.to(currentSlide.foreground.el, currentSlide.foreground.fadeSpeed, {opacity: 1})
        .to(currentSlide.middleforeground.el, currentSlide.middleforeground.fadeSpeed, {opacity: 1}, '-=1')
        .to(currentSlide.middleground.el, currentSlide.middleground.fadeSpeed, {opacity: 1}, '-=0.75')
        .to(currentSlide.middlebackground.el, currentSlide.middlebackground.fadeSpeed, {opacity: 1}, '-=0.5')
        .to(currentSlide.background.el, currentSlide.background.fadeSpeed, {opacity: 1}, '-=0.25');
}

$(document).ready(function() {
    fadeInStart();
})

// refreshes object to target slide with "current" class

function currentCheck() {
    currentSlide = {
        el: $('.current'),
        renderPrevious: function() {
            console.log("previous rendered")
        },
        renderNext: function() {
            console.log("next rendered");
        },
        foreground: {
            el: $('.current > ul > li.foreground'),
            class: 'layer foreground',
            dataDepth: '1.00',
            fadeSpeed: 1.5
        },
        middleforeground: {
            el: $('.current > ul > li.middleforeground'),
            class: 'layer middleforeground',
            dataDepth: '0.80',
            fadeSpeed: 1.25
        },
        middleground: {
            el: $('.current > ul > li.middleground'),
            class: 'layer middleground',
            dataDepth: '0.60',
            fadeSpeed: 1
        },
        middlebackground: {
            el: $('.current > ul > li.middlebackground'),
            class: 'layer middlebackground',
            dataDepth: '0.30',
            fadeSpeed: 0.75
        },
        background: {
            el: $('.current > ul > li.background'),
            class: 'layer background',
            dataDepth: '0.00',
            fadeSpeed: 0.5
        }
    }
};



/* Create a function that takes an object (i.e. hanselAndGretel above)
and adds each layer to the innerHTML of the li layers */

//function renderPage() {
//    var page = $('.slide').attr('current-page');
//    var story = $('.slide').attr('current-story');
//    
//    middlebg.empty();
//    middlebg.append(story[page]title;
//}

function fadeOut() {
    var nextSlide = $('.current').next();
    var tl = new TimelineLite();
    tl.to(currentSlide.foreground.el, currentSlide.foreground.fadeSpeed, {opacity: 0})
        .to(currentSlide.middleforeground.el, currentSlide.middleforeground.fadeSpeed, {opacity: 0}, '-=1')
        .to(currentSlide.middleground.el, currentSlide.middleground.fadeSpeed, {opacity: 0}, '-=0.75')
        .to(currentSlide.middlebackground.el, currentSlide.middlebackground.fadeSpeed, {opacity: 0}, '-=0.5')
        .to(currentSlide.background.el, currentSlide.background.fadeSpeed, {opacity: 0}, '-=0.25')
        .to(currentSlide.el, 0.1, {className: "-=current"})
        .to(nextSlide, 0.1, {className: "+=current"});
    
    TweenMax.delayedCall(3, fadeInNext);
}

function fadeInNext() {
    currentCheck();
    var tl = new TimelineLite();
    tl.to(currentSlide.foreground.el, currentSlide.foreground.fadeSpeed, {opacity: 1})
        .to(currentSlide.middleforeground.el, currentSlide.middleforeground.fadeSpeed, {opacity: 1}, '-=1')
        .to(currentSlide.middleground.el, currentSlide.middleground.fadeSpeed, {opacity: 1}, '-=0.75')
        .to(currentSlide.middlebackground.el, currentSlide.middlebackground.fadeSpeed, {opacity: 1}, '-=0.5')
        .to(currentSlide.background.el, currentSlide.background.fadeSpeed, {opacity: 1}, '-=0.25');
    
    TweenMax.delayedCall(0.1, startParallax);
}

$('.next-slide').on('click', function() {
    fadeOut();
})