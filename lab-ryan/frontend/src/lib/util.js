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

export const readCookie = (name) => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++){
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0);
    return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const log = (...args) =>
  __DEBUG__ ? console.log(...args) : undefined;
