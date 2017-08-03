export default (state=null, action) => {
  let {type, payload} = action;
  switch (type) {
  case 'PHOTO_CREATE':
    return payload;
  case 'PHOTO_FETCH':
    return payload;
  default:
    return state;
  }
};
