import $ from "jquery";

import "slick-carousel";
import { Fancybox } from "@fancyapps/ui";
import "./registration";

import "../scss/main.scss";
import "../index.html";

//slider
$(".slider__block").slick({
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  speed: 1000,
  zIndex: 0,
});

// burger
function myFunction() {
  document.querySelector(".menu__mobile").classList.toggle("show");
}

document.querySelector(".burger").onclick = function () {
  myFunction();
};

// button to top
$(window).scroll(function(){
  if($(window).scrollTop() > 400){
    $('#toTop').fadeIn(600)
  } else {
    $('#toTop').fadeOut(400)
  }
});

$("#inTop").click(function() {
  $("html, body").animate({
    scrollTop: $($(this).attr("href")).offset().top + "px"
  }, {
    duration: 500,
    easing: "swing"
  });
  return false;
});
