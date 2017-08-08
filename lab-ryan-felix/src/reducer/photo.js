import { CREATE_PHOTO, UPDATE_PHOTO, DELETE_PHOTO } from '../action/actions.js';

const validatePhoto = photo => photo.photo && photo.description && photo._id;

const reducer = {
  [CREATE_PHOTO]: (state, { payload }) => ({
    photos: [
      ...state.photos,
      payload,
    ],
  }),

  [UPDATE_PHOTO]: (state, { payload }) => ({
    photos: state.photos.map(photo => photo._id === payload._id ? payload : photo),
  }),

  [DELETE_PHOTO]: (state, { payload }) => ({
    photos: state.photos.filter(photo => photo._id !== payload._id),
  }),

  validator: photo => {
    if(!validatePhoto(photo))
      throw new Error('Invalid photo.');
  },
};

export default reducer;
