export default class DoubleSlider {
  constructor(parameters = {}) {
    this.min = parameters.min || 0;
    this.max = parameters.max || 100;
    this.formatValue = parameters.formatValue;
    this.selected = parameters.selected || {};

    this.selected.from = this.selected.from || this.min;
    this.selected.to = this.selected.to || this.max;

    this.calaculateRangeInPercent();

    if (!(typeof this.formatValue === 'function')) {
      this.formatValue = value => value;
    }

    this.element = this.createMainElement();

    this.selectDomElements();

    this.addEventListeners();
    
  }
moveAt = function(pageX, pageY) {
  if (pageX < this.sliderElementBoundaries.left) {
    pageX = this.sliderElementBoundaries.left;
  }

  if (pageX > this.sliderElementBoundaries.left + this.sliderElementBoundaries.width) {
    pageX = this.sliderElementBoundaries.left + this.sliderElementBoundaries.width;
  }

  if (this.selectedThumbElementType === 'left') {
    this.leftThumbElement.style.left = pageX + 'px';
    this.leftThumbElement.style.top = pageY + 'px';
    const leftValueInPercent = ((pageX - this.sliderElementBoundaries.left) / this.sliderElementBoundaries.width) * 100;
    this.rangeSliderProgress.style.left = leftValueInPercent + '%';
    this.selected.from = Math.round(this.min + (this.max - this.min) * leftValueInPercent / 100);
    this.leftSpanElement.textContent = this.formatValue(this.selected.from);
  }

  if (this.selectedThumbElementType === 'right') {
    this.rightThumbElement.style.left = pageX + 'px';
    this.rightThumbElement.style.top = pageY + 'px';
    const rightValueInPercent = ((pageX - this.sliderElementBoundaries.left) / this.sliderElementBoundaries.width) * 100;
    this.rangeSliderProgress.style.right = (100 - rightValueInPercent) + '%';
    this.selected.to = Math.round(this.min + (this.max - this.min) * rightValueInPercent / 100);
    this.rightSpanElement.textContent = this.formatValue(this.selected.to);
  }
}

selectDomElements() {
  this.leftThumbElement = this.element.querySelector('.range-slider__thumb-left');
  this.rightThumbElement = this.element.querySelector('.range-slider__thumb-right');
  this.sliderElement = this.leftThumbElement.parentElement;
  this.rangeSliderProgress = this.element.querySelector('.range-slider__progress');
  this.leftSpanElement = this.element.querySelector('[data-element="from"]');
  this.rightSpanElement = this.element.querySelector('[data-element="to"]');
}

addEventListeners() {
  this.leftThumbElement.addEventListener('pointerdown', event => this.mouseDownHandler(event));
  this.rightThumbElement.addEventListener('pointerdown', event => this.mouseDownHandler(event));

  document.addEventListener('pointerup', this.pointerUpEventHandler = (event) => {
    document.removeEventListener('pointermove', this.mouseMoveHandler);

    if (this.element) {
      this.element.dispatchEvent(new CustomEvent('range-select', {
        detail: this.getSliderValues(),
        bubbles: true
      })); 
    }
  });
}

calaculateRangeInPercent() {
  this.minSelectedInPercent = ((this.selected.from - this.min) / (this.max - this.min)) * 100;
  this.maxSelectedInPercent = 100 - ((this.selected.to - this.min) / (this.max - this.min)) * 100;
}

getSliderValues() {
  return {
    from: this.selected.from,
    to: this.selected.to
  };
}

createMainElement() {
  const mainElement = document.createElement('div');
  mainElement.innerHTML = this.getTemplate();
  return mainElement.firstChild;
}

getTemplate() {
  return `<div class="range-slider">
          <span data-element='from'>${this.formatValue(this.selected.from)}</span>
          <div class="range-slider__inner">
            <span class="range-slider__progress" style="left: ${this.minSelectedInPercent}%; right: ${this.maxSelectedInPercent}%"></span>
            <span class="range-slider__thumb-left" style="left: ${this.minSelectedInPercent}%"></span>
            <span class="range-slider__thumb-right" style="right: ${this.maxSelectedInPercent}%"></span>
          </div>
          <span data-element='to'>${this.formatValue(this.selected.to)}</span>
        </div>`;
}

destroy() {
  document.removeEventListener('pointerup', this.pointerUpEventHandler);

  if (this.element) {
    this.element.remove();
  }
  
  this.element = null;
}

mouseDownHandler(event) {
  let selectedThumbElement;

  if (event.target.classList.contains('range-slider__thumb-left')) {
    selectedThumbElement = this.leftThumbElement;
    this.selectedThumbElementType = 'left';
  }

  if (event.target.classList.contains('range-slider__thumb-right')) {
    selectedThumbElement = this.rightThumbElement;
    this.selectedThumbElementType = 'right';
  }

  if (!selectedThumbElement) {
    return;
  }

  const sliderRect = selectedThumbElement.getBoundingClientRect();
  this.topPosition = sliderRect.top + sliderRect.height / 2;
  selectedThumbElement.style.position = 'absolute';
  selectedThumbElement.style.zIndex = 1000;
  document.body.append(selectedThumbElement);

  this.sliderElementBoundaries = this.sliderElement.getBoundingClientRect();
  
  document.addEventListener('pointermove', this.mouseMoveHandler);
}

   mouseMoveHandler = (event) => {
     this.moveAt(event.clientX, this.topPosition);
   }
}
