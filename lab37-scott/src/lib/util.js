//export a function that reads if there's a cookie set in the Browser
export const readCookie = (name) => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};

export const photoToDataURL = (file) => {
  // return a promise that returns an object with then and catch
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    //add event listeners to file readers to do things
    reader.addEventListener('load', () => {
      //on load, take the result from the reader object and pass in to resolve, check the docs
      return resolve(reader.result);
    });
    reader.addEventListener('error', () => {
      return reject(reader.error);
    });
    if(file)
      reader.readAsDataURL(file);
    return reject(new Error('usage error: requires file input'));
  });
};
