"use strict";
var observer = new IntersectionObserver(skillBarsInView, { threshold: [0.5] });

$(document).ready(function () {
    $("#openingLogoPath")[0].addEventListener("animationend", function (e) {
        if (e.animationName == "fadeOut") {
            $("#logoAnimation")[0].remove();
        }
    });
    $("#pathBaseEle")[0].addEventListener("animationend", function (e) {
        if (e.animationName == "fillOpacity") {
            $("#mainContent")
                .css("display", "flex")
                .hide()
                .fadeIn(300);
            particlesJS.load('particleContainer', 'controller/particles.json?ver=1.0.1');
        }
    });
    window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
            $("#navbarDD").hide();
        }
    });
    window.onclick = function (e) {
        if (e.target.id != "navbarExpand" && e.target.id != "navbarExpandIcon") {
            if (!$(e.target).parent()[0].matches("#navbarList")) {
                if (!$("#navbarDD").first().is(":hidden")) {
                    $("#navbarDD").slideUp(500);
                }
            }
        }
    };
    window.onscroll = function () {
        if (!$("#navbarDD").first().is(":hidden")) {
            $("#navbarDD").slideUp(500);
        }
    };
    observer.observe($("#skillBars")[0]);

    $('#leetCodeProject').on('mousedown', (e) => { openProject(e, "https://github.com/Nox-iv/LeetCode-Solutions"); });
    $('#portfolioProject').on('mousedown', (e) => { openProject(e, "https://github.com/Nox-iv/portfolioSite"); });
    $('#censorBotProject').on('mousedown', (e) => { openProject(e, "https://github.com/Nox-iv/censor.js"); });
    $('#cppProject').on('mousedown', (e) => { openProject(e, "https://github.com/Nox-iv/cppOpperatorOverloading"); });
    $('#algoVisProject').on('mousedown', (e) => { openProject(e, "https://nox-iv.com/pathfinding-visualizer"); });
    $('#mockSocialProject').on('mousedown', (e) => { openProject(e, "https://nox-iv.com/social-media"); });

});


function navbarToggle() { ($("#navbarDD").first().is(":hidden")) ? $("#navbarDD").slideDown(500) : $("#navbarDD").slideUp(500); }
function navbarLostFocus() { $("#navbarDD").slideUp(500); }

function pageScroll(section, offset = 0) {
    $('html, body').animate({
        scrollTop: $(section).offset().top - offset
    }, 500);
}

function skillBarsInView(e, o) {
    if (e[0].isIntersecting) {
        sbAnimate("jsSkillBar", "90%", 0);
        sbAnimate("javaSkillBar", "80%", 250);
        sbAnimate("phpSkillBar", "80%", 500);
        sbAnimate("dbSkillBar", "70%", 750);
        sbAnimate("htmlSkillBar", "65%", 1000);
        observer.unobserve($(`#${e[0].target.id}`)[0]);
    }
}

function sbAnimate(skillBarEle, width, delay) {
    $($(`#${skillBarEle}`)[0].lastElementChild.lastElementChild).delay(delay).animate({ width: width, easing: "cubic-bezier(0.76, 0, 0.24, 1)" }, 750);
}

function openProject(e, link) {
    if ($(e.target).is('i')) return;
    (e.which == 1) ? location.href = link : window.open(link);
}
