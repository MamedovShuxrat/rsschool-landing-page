export function initBurger() {
  const header = document.querySelector(".header");
  if (!header) return;

  const burger = header.querySelector(".header__burger");
  const panel = header.querySelector(".header__panel");
  if (!burger || !panel) return;

  const desktop = window.matchMedia("(min-width: 769px)");

  function isOpen() {
    return header.classList.contains("header_open");
  }

  function setOpen(open) {
    header.classList.toggle("header_open", open);
    document.body.classList.toggle("lock", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  burger.addEventListener("click", () => setOpen(!isOpen()));

  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) setOpen(false);
  });

  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
