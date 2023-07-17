export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  render() {
    const mainElement = document.createElement('div');
    mainElement.dataset.element = 'productsContainer';
    mainElement.classList.add('products-list__container');
    this.element = mainElement;

    this.sort('title', 'asc');
  }

  renderTable() {
    this.mainTableElement = this.createMainTableElement();

    this.element.append(this.mainTableElement);

    const headerTableElement = this.createTableHeader();
    this.mainTableElement.append(headerTableElement);

    const bodyTableElement = this.createTableBody();
    this.mainTableElement.append(bodyTableElement);


    this.headerConfig.forEach(headerCell => {
      const headerCellElement = this.createTableHeaderCell(headerCell.id, headerCell.title, headerCell.sortable, headerCell.sortType);
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

  createTableHeaderCell(id, title, sortable, sortType) {
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
    
    let cellsData = '';

    this.headerConfig.forEach(field => {
      cellsData += this.getTableCellTemplate(rowData[field.id], field.id);
    });

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

  sort(field, order) {
    const headerCellConfig = this.headerConfig.find(header => header.id == field);
    const sortType = headerCellConfig.sortType;
    const sortFunction = this.dynamicSort(field, sortType, order);
    this.data.sort(sortFunction);

    this.removeTable();
    this.renderTable();

  }

  dynamicSort(field, type, order) {
    let sortOrder = 1;
    if (order == 'desc') {
      sortOrder = -1;
    }

    if (type == 'number') {
      return function(a, b) {
        let result = a[field] - b[field];
        return result * sortOrder;
      };
    }

    if (type == 'string') {
      return function(a, b) {
        let result = a[field].localeCompare(b[field], 'ru', {caseFirst: 'upper'});  
        return result * sortOrder;
      };
    }
  }

  get subElements() {
    return {body: this.element.querySelector(".sortable-table__body")};
  }

}

