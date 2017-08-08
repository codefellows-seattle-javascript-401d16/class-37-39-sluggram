const photoToDataURL = file => (
  new Promise((resolve, reject) => {
    if(!file)
      return reject(new Error('No file found.'));
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error));
    return reader.readAsDataURL(file);
  })
);

export default photoToDataURL;
