let validatePhotoCreate = (photo) => {
  if(!photo.photoURI || !photo.description || !photo._id || !photo.owner){
    throw new Error('VALIDATION ERROR: photo requires photoURI and description');
  }
};

export default (state = null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'PHOTO_CREATE':
    validatePhotoCreate(payload);
    return payload;
  case 'PHOTO_UPDATE':
    if(!state)
      throw new Error('USAGE ERROR: can not update when photo is null');
    validatePhotoCreate(payload);
    return {...state, ...payload};
  case 'PHOTO_FETCH':
    validatePhotoCreate(payload);
    return payload;
  case 'PHOTO_DELETE':
    validatePhotoCreate(payload);
    return state = state.filter(photo => photo._id !== payload._id);
  default:
    return state;
  }
};
