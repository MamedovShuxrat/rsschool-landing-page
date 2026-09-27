const modal = document.querySelector(".modal");

let basePrice = 0;

function createOption(icon, label, price, isActive) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = isActive ? "tab active" : "tab";
  button.dataset.price = price;
  button.innerHTML = `
    <span class="tab__icon">${icon}</span>
    <span class="tab__label">${label}</span>
  `;
  return button;
}

function updateTotal() {
  const activeOptions = modal.querySelectorAll(".modal__options .tab.active");

  let total = basePrice;

  activeOptions.forEach((option) => {
    total += Number(option.dataset.price);
  });
  modal.querySelector(".modal__price").textContent = `$${total.toFixed(2)}`;
}

export function openModal(product) {
  if (!modal) return;

  basePrice = Number(product.price);

  const img = modal.querySelector(".modal__img");
  img.src = product.image;
  img.alt = product.name;
  modal.querySelector(".modal__title").textContent = product.name;
  modal.querySelector(".modal__desc").textContent = product.description;

  const sizes = Object.entries(product.sizes).map(([key, size], index) => createOption(key.toUpperCase(), size.size, size["add-price"], index === 0));
  modal.querySelector('[data-options="sizes"]').replaceChildren(...sizes);

  const additives = product.additives.map((additives, index) => {
    return createOption(index + 1, additives.name, additives["add-price"], false);
  });

  modal.querySelector('[data-options="additives"]').replaceChildren(...additives);

  updateTotal();
  modal.showModal();
}

export function initModal() {
  if (!modal) return;

  const sizesBox = modal.querySelector('[data-options="sizes"]');
  const additivesBox = modal.querySelector('[data-options="additives"]');

  sizesBox.addEventListener("click", (e) => {
    const option = e.target.closest(".tab");
    if (!option) return;
    sizesBox.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("active", tab === option);
    });
    updateTotal();
  });

  additivesBox.addEventListener("click", (event) => {
    const option = event.target.closest(".tab");
    if (!option) return;
    option.classList.toggle("active");
    updateTotal();
  });

  modal.querySelector(".modal__close").addEventListener("click", () => modal.close());

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close(66);
  });
}
