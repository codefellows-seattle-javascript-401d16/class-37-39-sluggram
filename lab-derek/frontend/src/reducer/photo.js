let validatePhotoCreate = (photo) => {
  if(!photo.photoURI || !photo.description){
    throw new Error('VALIDATION_ERROR: photo requires photoURI and description');
  }
};

export default (state = [], action) => {
  let {type, payload} = action;

  switch(type){

  case 'PHOTO_CREATE':
    validatePhotoCreate(payload);
    return [...state, payload];

  case 'PHOTO_UPDATE':
    return [...state, payload];

  case 'PHOTO_FETCH':
    return [...state, payload];

  case 'PHOTO_DELETE':
    return state.filter(photo => photo._id !== payload._id);

  default:
    return state;
  }
};
