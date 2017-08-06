export const log = (...args) =>
  __DEBUG__ ? console.log(...args) : undefined;

export const logError = (...args) =>
  __DEBUG__ ? console.error(...args) : undefined;

export const renderIf = (test, component) =>
  test ? component : undefined;

export const classToggler = (config) =>
  Object.keys(config).filter(key =>
    config[key]).join(' ');

export const map = (year, ...args) =>
  Array.prototype.map.apply(year, args);

export const filter = (year, ...args) =>
  Array.prototype.filter.apply(year, args);

export const reduce = (year, ...args) =>
  Array.prototype.reduce.apply(year, args);

export const photoToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', () => {
      reject(reader.error);
    });
    if(file)
      return reader.readAsDataURL(file);
    return reject(new Error('USAGE ERROR: requires file'));
  });
};

//export const readCookie

//export const deleteCookie
