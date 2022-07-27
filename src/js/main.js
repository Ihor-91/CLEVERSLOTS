import $ from "jquery";

import "slick-carousel";
import { Fancybox } from "@fancyapps/ui";
import './registration';

import "../scss/main.scss";
import "../index.html";

//slider
$(".slider__block").slick({
  arrows: false,
  // autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  speed: 2000,
  zIndex: 0,
});

// burger
function myFunction() {
  document.querySelector(".menu__mobile").classList.toggle("show");
}

document.querySelector(".burger").onclick = function () {
  myFunction();
};