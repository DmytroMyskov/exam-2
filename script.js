const heroDots = document.querySelector('.dots');
const heroSlider = document.querySelector('.content>ul');
const carouselContent = document.querySelector('.carousel-content');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const carouselIndicators = document.querySelector('.carousel-indicators');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalItems = carouselItems.length;

heroDots.addEventListener('click', (e) => {
  if (e.target === heroDots) return;

  const li = e.target;
  const i = Array.from(heroDots.children).indexOf(li);
  const active = heroDots.querySelector('.active');
  active.classList.remove('active');
  li.classList.add('active');
  scrollTo(i)
});

heroSlider.addEventListener('scroll', () => {
  const index = Math.round(heroSlider.scrollLeft / heroSlider.offsetWidth);
  const active = heroDots.querySelector('.active');
  active.classList.remove('active');
  heroDots.children[index].classList.add('active');
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    dots.forEach(d => {
      d.classList.remove('active');
    });

    dot.classList.add('active');

    const clickedIndex = dot.dataset.index;
    console.log(`Клікнуто на точку з індексом: ${clickedIndex}`);
    goToSlide(clickedIndex);
  });
});

createIndicators();
updateCarousel();

function scrollTo(index) {
  heroSlider.scrollTo({
    left: index * heroSlider.offsetWidth,
    behavior: 'smooth'
  });
}

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

