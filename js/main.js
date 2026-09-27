import { toggleTheme } from "./utils/theme.js";
import { initSlider } from "./utils/slider.js";
import { initBurger } from "./utils/burger.js";
import { initModal } from "./utils/modal.js";
import { initCardsMenu } from "./utils/cardsMenu.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleTheme();
  initSlider();
  initBurger();
  initModal();
  initCardsMenu();
});
