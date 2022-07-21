const slider = document.querySelector('.slider__wrapper');
const sliderInstance = slider.querySelector('.slider');
const sliderWidth = slider.querySelector('.slider__item').offsetWidth;
const numberSlides  = slider.querySelectorAll('.slider__item').length;
const btnLeft = slider.querySelector('.btn__left');
const btnRight = slider.querySelector('.btn__right');
const progress = slider.querySelector('.slider__progress');
let numberVisibleSlides = 4;
let translationStartX = 0;
let translationEndX = 0;
let timerId;

progress.max = numberSlides;
progress.value = numberVisibleSlides;

const moveRight = () => {
  if (numberVisibleSlides < numberSlides) {
    sliderInstance.style.transform = `translateX(${-1 * sliderWidth * (numberVisibleSlides++ - 3)}px)`;
    progress.value += 1;
  } else {
    sliderInstance.style.transform = '';
    progress.value = 4;
    numberVisibleSlides = 4;
  };
}

const moveLeft = () => {
  if (numberVisibleSlides > 4) {
    sliderInstance.style.transform = `translateX(${-1 * sliderWidth * (--numberVisibleSlides - 4)}px)`;
    progress.value -= 1;
  } else {
    sliderInstance.style.transform = '';
    progress.value = 4;
    numberVisibleSlides = 4;
  };
}
     
function autoPlay() {
  return setInterval(() => {
    moveRight();
  }, 4000);
}

function pull() {
  clearInterval(timerId);

  if ((translationStartX - translationEndX) > 0) {
    moveRight();
  } else {
    moveLeft();
  }

  translationStartX = 0;
  translationEndX = 0;

  timerId = autoPlay();
}

function getStartCoordinats(event) {
  event = event || window.event;
  translationStartX = event.clientX;
  return translationStartX;
}

function getEndCoordinats(event) {
  event = event || window.event;
  translationEndX = event.clientX;
  return pull();
}

function init () {
  sliderInstance.addEventListener('mousedown', getStartCoordinats);
  sliderInstance.addEventListener('mouseup', getEndCoordinats);

  btnLeft.addEventListener('click', ()=>{
    clearInterval(timerId);
    moveLeft();
    timerId = autoPlay();
  });

  btnRight.addEventListener('click', ()=>{
    clearInterval(timerId);
    moveRight();
    timerId = autoPlay();
  });
  
  timerId = autoPlay();
}

window.addEventListener('load', init);