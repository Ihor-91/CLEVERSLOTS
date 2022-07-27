import $ from "jquery";

import "slick-carousel";

import "../scss/main.scss";
import "../index.html";

//slider
$(".slider__block").slick({
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  speed: 2000,
  zIndex: 0,
});
