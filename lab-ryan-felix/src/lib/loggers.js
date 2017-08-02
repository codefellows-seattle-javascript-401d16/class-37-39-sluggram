export const log = (it) => {
  if(__DEBUG__) {
    console.log(it);
  }
  return it;
};

export const error = (it) => {
  if(__DEBUG__) {
    console.error(it);
  }
  return it;
};

export const dir = (it) => {
  if(__DEBUG__) {
    console.dir(it);
  }
  return it;
};
