/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const output = {};
  const entries = Object.entries(obj);

  for (let [key, value] of entries) {
    if (!fields.includes(key)) {
      output[key] = value;
    }
  }

  return output;
};
