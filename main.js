const slider = document.querySelector('.slider__wrapper');
const sliderInstance = slider.querySelector('.slider');
const sliderWidth = slider.querySelector('.slider__item').offsetWidth;
const numberSlides  = slider.querySelectorAll('.slider__item').length;
const btnLeft = slider.querySelector('.btn__left');
const btnRight = slider.querySelector('.btn__right');
const progress = slider.querySelector('.slider__progress');
const timer = 4; 
let numberVisibleSlides = 4;
let translationStartX = 0;
let translationEndX = 0;
let timerId;

/**
 * For moving right via transform translateX
 */
function moveRight() {
  if (numberVisibleSlides < numberSlides) {
    sliderInstance.style.transform = `translateX(${-1 * sliderWidth * (numberVisibleSlides++ - 3)}px)`;
    progress.value += 1;
  } else {
    sliderInstance.style.transform = '';
    progress.value = 4;
    numberVisibleSlides = 4;
  };
}

/**
 * For moving left via transform translateX
 */
function moveLeft() {
  if (numberVisibleSlides > 4) {
    sliderInstance.style.transform = `translateX(${-1 * sliderWidth * (--numberVisibleSlides - 4)}px)`;
    progress.value -= 1;
  } else {
    sliderInstance.style.transform = '';
    progress.value = 4;
    numberVisibleSlides = 4;
  };
}

/**
 * For calling moveRight every time s
 */
function autoPlay() {
  return setInterval(() => {
    moveRight();
  }, timer * 1000);
}

/**
 * For moving right or left where touch events were done via transform translateX
 */
function pull() {
  reloadAutoPlay();

  if ((translationStartX - translationEndX) > 0) {
    moveRight();
  } else {
    moveLeft();
  }

  translationStartX = 0;
  translationEndX = 0;
}

/**
 * For setting initial mouse move coordinats
 */
function setStartCoordinats(event) {
  event = event || window.event;
  translationStartX = event.clientX;
}

/**
 * For setting end mouse move coordinats
 */
function setEndCoordinats(event) {
  event = event || window.event;
  translationEndX = event.clientX;
}

/**
 * For reloading autoplay
 */
function reloadAutoPlay() {
  clearInterval(timerId);
  timerId = autoPlay();
}

function init () {
  progress.max = numberSlides;
  progress.value = numberVisibleSlides;
  
  timerId = autoPlay();

  sliderInstance.addEventListener('mousedown', setStartCoordinats);
  sliderInstance.addEventListener('mouseup', (event) => {
    setEndCoordinats(event);
    pull();
  });
  sliderInstance.addEventListener('touchstart', (event) => setStartCoordinats(event.changedTouches[0]));
  sliderInstance.addEventListener('touchend', (event) => {
    setEndCoordinats(event.changedTouches[0]);
    pull();
  });
  btnLeft.addEventListener('click', ()=>{
    reloadAutoPlay();
    moveLeft();
  });
  btnRight.addEventListener('click', ()=>{
    reloadAutoPlay();
    moveRight();
  });
}

window.addEventListener('load', init);