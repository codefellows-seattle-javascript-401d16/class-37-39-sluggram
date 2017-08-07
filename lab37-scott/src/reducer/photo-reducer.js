export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'PHOTO_CREATE':
    return [payload, ...state];

  case 'PHOTO_FETCH':
    return payload;

  case 'PHOTO_UPDATE':
    return state.map(photo => {
      return photo._id === payload._id ? payload : photo;
    });

  case 'PHOTO_DELETE':
    console.log('photo reducer: ', payload);
    return state.filter(photo => {
      return photo._id !== payload._id;
    });

  default: return state;

  }

};
