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

    this.elementPointerOverHandler = this.elementPointerOver.bind(this);
    this.elementPointerOutHandler = this.elementPointerOut.bind(this);

    document.addEventListener('pointerover', this.elementPointerOverHandler);
    document.addEventListener('pointerout', this.elementPointerOutHandler);

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

  elementPointerOver(event) {
    if (event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip);
      this.element.style.top = event.clientY + 'px';
      this.element.style.left = event.clientX + 'px';
    }
  }

  elementPointerOut(event) {
    this.element.remove();
  }

  destroy() {
    document.removeEventListener('pointerover', this.elementPointerOverHandler);
    document.removeEventListener('pointerout', this.elementPointerOutHandler);
    this.element = null;
  }
}



export default Tooltip;
