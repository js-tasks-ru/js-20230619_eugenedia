class Tooltip {
  static instance = null;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
      
    Tooltip.instance = this;
  }

  initialize () {
    this.element = this.createMainElement();

    document.addEventListener('pointerover', this.elementPointerOverHandler.bind(this), false);
    document.addEventListener('pointerout', this.elementPointerOutHandler.bind(this), false);

  }

  render(text) {
    this.element.innerHTML = text;
    document.body.append(this.element);
  }

  createMainElement() {
    const mainElement = document.createElement('div');
    mainElement.innerHTML = this.getTemplate();
    return mainElement.firstChild;
  }

  getTemplate() {
    return '<div class="tooltip"></div>';
  }

  elementPointerOverHandler(event) {
    if (event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip);
      this.element.style.top = event.clientY + 'px';
      this.element.style.left = event.clientX + 'px';
    }
  }

  elementPointerOutHandler(event) {
    this.element.remove();
  }

  destroy() {
    this.element = null;
  }
}



export default Tooltip;
