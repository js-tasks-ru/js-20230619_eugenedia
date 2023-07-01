/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const parts = path.split('.');
  
  const getter = function(obj) {
    let tempObj = obj;

    for (let part of parts) {
      if (!tempObj) {
        return;
      }
      tempObj = tempObj[part];
    }

    return tempObj;
  };

  return getter;
}
