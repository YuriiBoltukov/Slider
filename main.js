const slider = document.querySelector('.slider__wrapper');
const sliderInstance = slider.querySelector('.slider');
const sliderWidth = slider.querySelector('.slider__item').offsetWidth;
const numberSlides  = slider.querySelectorAll('.slider__item').length;
const btnLeft = slider.querySelector('.btn__left');
const btnRight = slider.querySelector('.btn__right');
const progress = slider.querySelector('.slider__progress');
const timer = 4; 
let numberVisibleSlides;
let numberLastVisibleSlide;
let translationStartX = 0;
let translationEndX = 0;
let timerId;

/**
 * For defining number of visible slides
 * @returns {number}
 */
function defineNumberVisibleSlides() {
  const slideList = slider.querySelectorAll('.slider__content');
  let count = 0;

  /**
   * For checking visible el on the ClientRect
   * @param {HTMLElement} el
   * @returns {boolean}
   */
  const checkVisibleEL = (el) => {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }


  for (let slide of slideList) {
    if (checkVisibleEL(slide)) count ++;
  }

  return count;
}

/**
 * For clearing progress
 */
function rollbackProgress() {
  sliderInstance.style.transform = '';
  progress.value = numberLastVisibleSlide = defineNumberVisibleSlides();
}

/**
 * For moving right via transform translateX
 */
function moveRight() {
  if (numberLastVisibleSlide < numberSlides) {
    sliderInstance.style.transform = `translateX(${-1 * sliderWidth * (numberLastVisibleSlide++ - (numberVisibleSlides - 1))}px)`;
    progress.value += 1;
  } else {
    rollbackProgress();
  };
}

/**
 * For moving left via transform translateX
 */
function moveLeft() {
  if (numberLastVisibleSlide > numberVisibleSlides) {
    sliderInstance.style.transform = `translateX(${-1 * sliderWidth * (--numberLastVisibleSlide - numberVisibleSlides)}px)`;
    progress.value -= 1;
  } else {
    rollbackProgress();
  };
}

/**
 * For calling moveRight every time s
 * @returns {NodeJS.Timeout}
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
  numberLastVisibleSlide = numberVisibleSlides = defineNumberVisibleSlides();
  progress.max = numberSlides;
  progress.value = numberVisibleSlides;

  timerId = autoPlay();

  slider.addEventListener('mousedown', (event) => {
    event.stopPropagation();
    event.preventDefault();
    setStartCoordinats(event);
    console.log('mousedown', event)
  });
  slider.addEventListener('mouseup', (event) => {
    event.stopPropagation();
    event.preventDefault();
    setEndCoordinats(event);
    console.log('mouseup', event)
    pull();
  });
  slider.addEventListener('touchstart', (event) => {
    event.stopPropagation();
    event.preventDefault();
    setStartCoordinats(event.changedTouches[0]);
    console.log('touchstart', event)
  });
  slider.addEventListener('touchend', (event) => {
    event.stopPropagation();
    event.preventDefault();
    setEndCoordinats(event.changedTouches[0]);
    console.log('touchend', event)
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
  window.addEventListener('resize', () => numberVisibleSlides = defineNumberVisibleSlides());
}

window.addEventListener('load', init);