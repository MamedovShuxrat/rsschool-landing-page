export function initSlider() {
  const slider = document.querySelector(".favorite__slider");
  if (!slider) return;  

  const row = slider.querySelector(".favorite__slide-row");
  const slides = slider.querySelectorAll(".favorite__slide");
  const dots = slider.querySelectorAll(".favorite__dot");
  const arrows = slider.querySelectorAll(".favorite__arrow");

  let current = 0;  
  function goTo(index) {
    
    // для 3 слайдов: (2 + 1 + 3) % 3 = 0,  (0 - 1 + 3) % 3 = 2
    current = (index + slides.length) % slides.length;
    row.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const dir = Number(arrow.dataset.dir); // -1 назад, 1 вперёд
      goTo(current + dir);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  goTo(0);
}
