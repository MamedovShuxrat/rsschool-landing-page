import { openModal } from "./modal.js";
const INITIAL_COUNT = 4;
export async function initCardsMenu() {
  const grid = document.querySelector(".menu__grid");
  if (!grid) return;

  const tabs = document.querySelectorAll(".menu__tabs .tab");

  const moreButton = document.querySelector(".menu__more");
  const mobile = window.matchMedia("(max-width:768px)");
  let isExpanded = false;

  function updateVisibility() {
    const cards = grid.querySelectorAll(".menu__preview");

    const limit = mobile.matches && !isExpanded ? INITIAL_COUNT : cards.length;

    cards.forEach((card, index) => {
      card.hidden = index >= limit;
    });

    moreButton.hidden = cards.length <= limit;
  }

  moreButton.addEventListener("click", () => {
    isExpanded = true;
    updateVisibility();
  });

  mobile.addEventListener("change", () => {
    isExpanded = false;
    updateVisibility();
  });

  const response = await fetch("data/products.json");
  const products = await response.json();

  function createCard(product) {
    const card = document.createElement("div");
    card.className = "menu__preview";
    card.innerHTML = `
         <img class="menu__preview-img" src="${product.image}" alt="${product.name}" width="310" height="310" loading="lazy" />
            <div class="menu__preview-desc">
                  <h3 class="menu__preview-title">${product.name}</h3>
                  <p class="menu__preview-desc-text">${product.description}</p>
                  <p class="menu__preview-price">$${product.price}</p>
            </div>
    `;

    card.addEventListener("click", () => {
      openModal(product);
    });

    return card;
  }

  function showCategory(category) {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.category === category);
    });

    const cards = products.filter((product) => product.category === category).map(createCard);
    grid.replaceChildren(...cards);
    isExpanded = false;
    updateVisibility();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => showCategory(tab.dataset.category));
  });

  showCategory(tabs[0].dataset.category);
}
