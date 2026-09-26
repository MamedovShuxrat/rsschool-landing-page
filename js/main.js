import { toggleTheme } from "./utils/theme.js";
import { initSlider } from "./utils/slider.js";
import { initBurger } from "./utils/burger.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleTheme();
  initSlider();
  initBurger();
});
