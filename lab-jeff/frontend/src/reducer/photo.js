export default (state=[], action) => {
  let {type, payload} = action;
  switch(type){
  case 'PHOTO_CREATE':
    return [...state, payload];
  case 'PHOTO_UPDATE':
    return [...state, ...payload];
  case 'PHOTO_DELETE':
    return null;
  default:
    return state;
  }
};
