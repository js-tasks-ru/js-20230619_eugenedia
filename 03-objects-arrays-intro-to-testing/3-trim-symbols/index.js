/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';  
  }

  if (string === '' || !size) {
    return string;
  }

  let counter = 0;
  let previousChar;
  let output;

  for (let letter of string) {
    if (!previousChar) {
      output = letter;
      previousChar = letter;
      continue;
    }

    if (letter === previousChar) {
      counter++;
      if (counter < size) {
        output += letter;
      }
      continue;  
    }
    
    counter = 0;
    output += letter;
    previousChar = letter;
  }

  return output;
}


