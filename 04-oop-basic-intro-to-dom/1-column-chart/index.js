const chartHeightMax = 50;

export default class ColumnChart {
  chartHeight = chartHeightMax

  constructor(object = {}) {

    const {label = '', link = '', value = '', formatHeading = '', data = []} = object;
    
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.data = data;

    this.render();
  }

  render() {
    const rootElement = this.createRootElement();

    const titleElement = this.createTitleElement(this.label);

    const titleAnchorElement = this.createTitleAnchorElement(this.link);

    const createTotalValueElement = this.createTotalValueElement(this.value, this.formatHeading);

    const columnsElements = this.createColumnsElements(this.data);


    this.element.append(titleElement);
    
    this.element.append(titleAnchorElement);

    this.element.append(createTotalValueElement);
    
    this.element.append(columnsElements);

    if (!this.data.length) {
      this.element.classList.add('column-chart_loading');
    }
  }

  update(newData) {
    const chartBody = this.element.querySelector('.column-chart__chart');
   
    const columnsElements = this.createColumnsElements(newData);

    chartBody.replaceWith(columnsElements);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  
  destroy() {
    this.remove();
    this.element = null;
  }

  createRootElement () {
    this.element = document.createElement('div');
    this.element.classList.add('dashboard__chart_label}');

    const mainDivElement = document.createElement('div');
    mainDivElement.classList.add('column-chart');
    mainDivElement.style = `--chart-height:${this.chartHeight}`;
    this.element.append(mainDivElement);

    return this.element;
  }

  createTitleElement () {
    const titleElement = document.createElement('div');
    titleElement.classList.add('column-chart__title');
    titleElement.innerHTML = this.label;
    return titleElement;
  }

  createTitleAnchorElement () {
    const titleAnchorElement = document.createElement('a');
    titleAnchorElement.title = 'This is a title';
    titleAnchorElement.href = this.link;

    const linkTextElement = document.createTextNode('link');
    titleAnchorElement.append(linkTextElement);
    titleAnchorElement.classList.add('column-chart__link');

    return titleAnchorElement;
  }

  createTotalValueElement (value, formatHeading) {
    const totalValueElement = document.createElement('div');
    totalValueElement.textContent = this.value;
    totalValueElement.classList.add('column-chart__header');
    
    if (this.formatHeading instanceof Function) {
      totalValueElement.textContent = formatHeading(value);
    }

    return totalValueElement;
  }

  createColumnsElements(data) {
    const columnsElements = document.createElement('div');
    columnsElements.classList.add('column-chart__chart');

    const columnProps = this.getColumnProps(data);

    for (let columnData of columnProps) {
      const columnElement = document.createElement('div');
      columnElement.style = `--value: ${columnData.value}`;
      columnElement.dataset.tooltip = columnData.percent;
      columnsElements.append(columnElement);
    }

    return columnsElements;
  }

  getColumnProps = function(data) {
    const maxValue = Math.max(...data);
    const scale = chartHeightMax / maxValue;
  
    return data.map(item => ({
      percent: (item / maxValue * 100).toFixed(0) + '%',
      value: String(Math.floor(item * scale))
    }));
  }

  
}
