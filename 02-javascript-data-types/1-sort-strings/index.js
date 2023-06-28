/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

  const arrCopy = [...arr];

  if (param == 'asc') {
    return arrCopy.sort(sortStringAscending);
  }
  else {
    return arrCopy.sort(sortStringDescending);
  }
}


function sortStringAscending(a, b) {
  return a.localeCompare(b, 'ru', {caseFirst: 'upper'});  
}
  

function sortStringDescending(a, b) {
  return -a.localeCompare(b, 'ru', {caseFirst: 'upper'}); 
}

