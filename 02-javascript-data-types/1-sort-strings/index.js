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
  else if (param == 'desc') {
    return arrCopy.sort(sortStringDescending);
  }
  return arrCopy;
}


function sortStringAscending(a, b) {
  if (a.localeCompare(b, 'ru', {caseFirst: 'upper'}) < 0) {
    return -1;
  }
  else if (a.localeCompare(b, 'ru', {caseFirst: 'upper'}) > 0) {
    return 1;
  }
  else {
    return 0;
  }
}

function sortStringDescending(a, b) {
  if (a.localeCompare(b, 'ru', {caseFirst: 'upper'}) < 0) {
    return 1;
  }
  else if (a.localeCompare(b, 'ru', {caseFirst: 'upper'}) > 0) {
    return -1;
  }
  else {
    return 0;
  }
}

