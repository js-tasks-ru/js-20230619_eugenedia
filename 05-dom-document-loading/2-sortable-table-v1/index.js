import dynamicSort from "./sorting-function.js"
export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  render() {
    const mainElement = this.createMainElement();
    this.element = mainElement;

    this.sortData('title', 'asc');

    this.removeTable();
    this.renderTable();
  }

  createMainElement() {
    const mainElement = document.createElement('div');
    mainElement.dataset.element = 'productsContainer';
    mainElement.classList.add('products-list__container');
    return mainElement;
  }

  renderTable() {
    this.mainTableElement = this.createMainTableElement();

    this.element.append(this.mainTableElement);

    const headerTableElement = this.createTableHeader();
    this.mainTableElement.append(headerTableElement);

    const bodyTableElement = this.createTableBody();
    this.mainTableElement.append(bodyTableElement);


    this.headerConfig.forEach(headerCellConfig => {
      const headerCellElement = this.createTableHeaderCell(headerCellConfig);
      headerTableElement.append(headerCellElement.content);
    });

    this.data.forEach(tableBodyRowData => {
      const tableBodyRowElement = this.createTableBodyRowElement(tableBodyRowData);
      bodyTableElement.append(tableBodyRowElement.content);
    });
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
  
  removeTable() {
    if (this.mainTableElement) {
      this.mainTableElement.remove();
    }
  }

  createMainTableElement() {
    const mainTableElement = document.createElement('div');
    mainTableElement.classList.add('sortable-table');
    return mainTableElement;
  }

  createTableHeader() {
    const headerTableElement = document.createElement('div');

    headerTableElement.dataset.element = 'header';
    headerTableElement.classList.add('sortable-table__header');
    headerTableElement.classList.add('sortable-table__row');
    return headerTableElement;
  }

  createTableBody() {
    const bodyTableElement = document.createElement('div');
    
    bodyTableElement.dataset.element = 'body';
    bodyTableElement.classList.add('sortable-table__body');
    return bodyTableElement;
  }

  createTableHeaderCell(headerConfig) {

    const {id, title, sortable, sortType } = headerConfig;

    const tableHeaderCellElement = document.createElement('template');

    tableHeaderCellElement.innerHTML = `<div class="sortable-table__cell" data-id=${id} data-sortable=${sortable}>
                                <span>${title}</span>
                                ${sortable ? this.getSortableArrowTemplate() : ""}      
                                </div>`;

    return tableHeaderCellElement;
  }

  getSortableArrowTemplate() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
            </span>`;
  }

  createTableBodyRowElement(rowData) {
    const tableBodyCellElement = document.createElement('template');
    
    let cellsData = this.headerConfig.map( field => {
      return this.getTableCellTemplate(rowData[field.id], field.id)
    }).join(' ');

    tableBodyCellElement.innerHTML = `<a href="/products/${rowData.id}" class="sortable-table__row">
                                        ${cellsData}
                                      </a>`;
    return tableBodyCellElement;

  }

  getTableCellTemplate(cellData, fieldId) {
    if (!cellData) {
      return '';
    }

    if (fieldId === 'images') {
      return this.getTableCellImageTemplate(cellData);
    }

    const outputTemplate = ` <div class="sortable-table__cell">${cellData}</div>`;
    return outputTemplate;
  }

  getTableCellImageTemplate(images) {
    const outputTemplate = ` <div class="sortable-table__cell">
                             <img class="sortable-table-image" alt="Image" src=${images[0].url}>
                             </div>`;
    return outputTemplate;
  }

  sortData(field, order) {
    const headerCellConfig = this.headerConfig.find(header => header.id == field);
    const sortType = headerCellConfig.sortType;
    const sortFunction = dynamicSort(field, sortType, order);
    this.data.sort(sortFunction);
  }
  
  sort(field, order) {
    this.sortData(field, order);

    this.removeTable();
    this.renderTable();
  }

  get subElements() {
    return {body: this.element.querySelector(".sortable-table__body")};
  }

}

