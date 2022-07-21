const slider = document.querySelector('.slider');
const sliderItem = document.querySelector('.slider__item');
const lengthListSlides  = document.querySelectorAll('.slider__item').length;
const slidesWidth = sliderItem.offsetWidth;
const left = document.querySelector('.btn__left');
const right = document.querySelector('.btn__right');
const progress = document.querySelector('.slider__progress');
let numberVisibleSlides = 4;
let startX = 0;
let endX = 0;
let restSlides = lengthListSlides;
let timerId;

progress.max = lengthListSlides;
progress.value = numberVisibleSlides;

const moveRight = () => {
  if (numberVisibleSlides < lengthListSlides) {
    slider.style.transform = `translateX(${-1 * slidesWidth * (numberVisibleSlides++ - 3)}px)`;
    progress.value += 1;
    restSlides--;
  } else {
    slider.style.transform = '';
    progress.value = 4;
    restSlides = numberVisibleSlides = 4;
  };
}

const moveLeft = () => {
  if (numberVisibleSlides > 4) {
    slider.style.transform = `translateX(${-1 * slidesWidth * (--numberVisibleSlides - 4)}px)`;
    progress.value -= 1;
    restSlides++;
  } else {
    slider.style.transform = '';
    progress.value = 4;
    restSlides = numberVisibleSlides = 4;
  };
}
     
function autoPlay() {
  return setInterval(() => {
    moveRight();
  }, 4000);
}

const pull = () => {
  if ((startX - endX) > 0) {
    numberVisibleSlides++;
    restSlides--;
    moveRight();
  } else {
    numberVisibleSlides--;
    restSlides++;
    moveLeft();
  }
  startX = 0;
  endX = 0;
  timerId = autoPlay();
}

const getStartCoordinats = () => {
  slider.onmousedown= function (event) {
    event = event || window.event;
    startX = event.clientX;
    return startX;
  }
}

const getEndCoordinats = () => {
  slider.onmouseup= function (event) {
    event = event || window.event;
    endX = event.clientX;
    return pull();
  }
}

left.addEventListener('click', ()=>{
  clearInterval(timerId);
  moveLeft();
  timerId = autoPlay();
});

right.addEventListener('click', ()=>{
  clearInterval(timerId);
  moveRight();
  timerId = autoPlay();
});

function init () {
  pull();
  getStartCoordinats();
  getEndCoordinats();
}

//init();