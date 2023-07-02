export default class ColumnChart {
  chartHeight = 50

  constructor( {label = '', link = '', value = '', formatHeading = '', data = []} = {}) {
    this.element = document.createElement('div');

    const p = document.createElement('p');
    p.classList.add('column-chart__title');
    p.innerHTML = label;

    this.element.append(p);

    const anchor = document.createElement('a');

    anchor.title = 'This is a title';
    anchor.href = link;

    const linkText = document.createTextNode('link');
    anchor.append(linkText);
    anchor.classList.add('column-chart__link');

    this.element.append(anchor);

    const totalValue = document.createElement('span');
    totalValue.textContent = value;
    totalValue.classList.add('column-chart__header');
    
    if(formatHeading instanceof Function) {
      totalValue.textContent = formatHeading(value);
    }

    this.element.append(totalValue);

    const columns = this.getColumns(data);

    this.element.append(columns);

    if (!data.length) {
      this.element.classList.add('column-chart_loading');
    }

  }

  update(newData) {
    const chartBody = this.element.querySelector('.column-chart__chart');
   
    const columns = this.getColumns(newData);

    chartBody.replaceWith(columns);
  }

  remove() {
    this.element.remove();
  }
  
  destroy() {

  }

  getColumns(data) {
    const columns = document.createElement('div');
    columns.classList.add('column-chart__chart');

    const columnProps = this.getColumnProps(data);

    for (let columnData of columnProps) {
      const column = document.createElement('div');
      column.style = `--value: ${columnData.value}`;
      column.dataset.tooltip = columnData.percent;
      columns.append(column);
    }

    return columns;
  }

  getColumnProps = function(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;
  
    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  
}
