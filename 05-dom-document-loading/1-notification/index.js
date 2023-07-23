export default class NotificationMessage {
  static element;

  static get DefaultDuration() {
    return 20000;
  }

  constructor(message, object = {}) {
    const {duration = NotificationMessage.DefaultDuration, type = 'success'} = object;

    this.duration = duration;
    this.type = type;
    this.message = message;
    
    if(NotificationMessage.element) {
      NotificationMessage.element.remove();
    }

    this.render();
  }

  render() {
    const mainElement = document.createElement('div');
    mainElement.innerHTML = this.getContentTemplate();

    this.element = mainElement.firstElementChild;
    
    NotificationMessage.element = mainElement;
  }

  getContentTemplate() {
    return `<div class='notification ${this.type}' style='--value:${this.calculateTimeInSeconds()}s;'>
              <div class="timer"></div>
                <div class="inner-wrapper">
                  <div class="notification-header">success</div>
                    <div class="notification-body">
                      ${this.message}
                </div>
              </div>
              </div>`;
  }

  destroy() {
    this.remove();
  }

  show(outerElement = document.body) {
    outerElement.append(NotificationMessage.element);

    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  calculateTimeInSeconds() {
    if (this.duration) {
      return this.duration / 1000;  
    }

    return NotificationMessage.DefaultDuration / 1000;
  }

}
