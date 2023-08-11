import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';
const CHART_HEIGHT_MAX = 50;

export default class ColumnChart {
  chartHeight = CHART_HEIGHT_MAX

  constructor(object = {}) {

    const {label = '', link = '', value = '', formatHeading = '', data = [], url = '', range = {}} = object;
    
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.data = data;
    this.url = url;
    this.range = range;
    
    this.render();
  }

  render() {
    this.createRootElement();

    const titleElement = this.createTitleElement(this.label);

    const titleAnchorElement = this.createTitleAnchorElement(this.link);

    const createTotalValueElement = this.createTotalValueElement(this.value, this.formatHeading);

    const columnsElements = this.createChartImageElement();

    this.element.append(titleElement);
    
    this.element.append(titleAnchorElement);

    this.element.append(createTotalValueElement);
    
    this.element.append(columnsElements);

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
    this.element.classList.add('column-chart');
    this.element.classList.add('column-chart_loading');
    this.element.style = `--chart-height:${this.chartHeight}`;
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

  createChartImageElement() {
    const columnsElements = document.createElement('div');
    columnsElements.classList.add('column-chart__chart');
    if (!this.data.length) {
      this.loadSvgDiagram(columnsElements);
    }

    return columnsElements;
  }

  createColumnsOfChartImage() {

    const columnProps = this.getColumnProps();
    const chartElement = this.element.querySelector('.column-chart__chart');
   chartElement.innerHTML = '';

    for (let columnData of columnProps) {
      const columnElement = document.createElement('div');
      columnElement.style = `--value: ${columnData.value}`;
      columnElement.dataset.tooltip = columnData.percent;
      
      chartElement.append(columnElement);
    }

  }

  getColumnProps = function() {
    const maxValue = Math.max(...this.data);
    const scale = CHART_HEIGHT_MAX / maxValue;
  
    return this.data.map(item => ({
      percent: (item / maxValue * 100).toFixed(0) + '%',
      value: String(Math.floor(item * scale))
    }));
  }

  loadSvgDiagram (columnsElements) {
    fetch('charts-skeleton.svg')
    .then(response => response.text())
    .then(svg => { 
      columnsElements.innerHTML = svg;
    });
  }

   async getDataFromServer(startDate, endDate) {
    const response = await fetch(BACKEND_URL +'/' + this.url + '?' + new URLSearchParams({
      from: startDate,
      to: endDate
    }));

    const data = await response.json();

    return data;
  }

  async update(startDate, endDate) {
    const data = await this.getDataFromServer(startDate, endDate);
    this.element.classList.remove('column-chart_loading');
    this.data = Object.values(data);
    
    this.createColumnsOfChartImage();

    return data;
  }

  get subElements() {
    return { body: this.element.querySelector('.column-chart__chart') };
  }
}
