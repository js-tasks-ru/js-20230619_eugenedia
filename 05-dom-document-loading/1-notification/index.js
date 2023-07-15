export default class NotificationMessage {
  static element;

  static get DefaultDuration() {
    return 20;
  }

  constructor(message, object = {}) {
    const {duration = NotificationMessage.DefaultDuration, type = 'success'} = object;

    this.duration = duration;
    this.type = type;
    this.message = message;
         
    this.render();
  

  }

  render() {
    const mainElement = this.createMainElement();

    const contentElement = this.getContentTemplate();
    mainElement.innerHTML = contentElement;     
  
    this.remove();
    
    NotificationMessage.element = mainElement;
  }

  createMainElement() {
    const mainElement = document.createElement('div');
    mainElement.classList.add('notification');
    mainElement.classList.add(`${this.type}`);
    mainElement.style = `--value:${this.calculateTimeInSeconds()}s`;
    return mainElement;
  }

  getContentTemplate() {
    return `<div class="timer"></div>
              <div class="inner-wrapper">
                <div class="notification-header">success</div>
                  <div class="notification-body">
                     ${this.message}
                  </div>
                  </div>`;
  }

  get element() {
    return NotificationMessage.element;
  }

  destroy() {
    this.remove();
  }

  show(outerElement) {
    outerElement = outerElement || document.body;

    outerElement.append(NotificationMessage.element);

    setTimeout(() => {
      this.destroy();
      this.remove();      
    }, this.duration);
  }

  remove() {
    if (NotificationMessage.element) {
      NotificationMessage.element.remove();
    }
  }

  calculateTimeInSeconds() {
    if (this.duration) {
      return this.duration / 1000;  
    }

    return NotificationMessage.DefaultDuration;
  }

}
