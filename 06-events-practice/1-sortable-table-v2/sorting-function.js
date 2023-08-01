export default function dynamicSort(field, type, order) {
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