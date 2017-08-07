let validatePhotoCreate = (photo) => {
  if(!photo.photoURI || !photo.description || !photo._id || !photo.owner){
    throw new Error('VALIDATION ERROR: photo requires photoURI and description');
  }
};

export default (state = [], action) => {
  let {type, payload} = action;
  switch(type){

  case 'PHOTO_CREATE':
    validatePhotoCreate(payload);
    return [...state, payload];

  case 'PHOTO_UPDATE':
    validatePhotoCreate(payload);
    return state.map(photo =>
      photo.id == payload._id ? payload : photo);

  case 'PHOTO_FETCH':
    validatePhotoCreate(payload);
    return payload;

  case 'PHOTO_DELETE':
    validatePhotoCreate(payload);
    return state.filter(photo => photo._id !== payload._id);

  case 'LOGOUT':
    return [];

  default:
    return state;
  }
};
