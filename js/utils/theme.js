const STORAGE_KEY = "theme";

const root = document.documentElement;
const options = document.querySelectorAll(".header__theme-option");

function applyTheme(theme) {
  if (theme === "dark") {
    root.dataset.theme = "dark";
  } else {
    delete root.dataset.theme;
  }

  options[0].classList.toggle("active", theme === "light");
  options[1].classList.toggle("active", theme === "dark");

  localStorage.setItem(STORAGE_KEY, theme);
}

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

applyTheme(getInitialTheme());

export function toggleTheme() {
  const toggle = document.querySelector(".header__theme");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}
