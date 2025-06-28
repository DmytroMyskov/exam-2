document.addEventListener('DOMContentLoaded', () => {
  const carouselContent = document.querySelector('.carousel-content');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const carouselIndicators = document.querySelector('.carousel-indicators');

  let currentIndex = 0;
  const totalItems = carouselItems.length;

  function createIndicators() {
    carouselIndicators.innerHTML = '';
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('div');
      dot.classList.add('indicator-dot');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        updateIndicators();
      });
      carouselIndicators.appendChild(dot);
    }
  }

  function updateIndicators() {
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselContent.style.transform = `translateX(${offset}%)`;
    updateIndicators();
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });

  createIndicators();
  updateCarousel();
});