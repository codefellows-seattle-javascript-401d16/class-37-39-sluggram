import superagent from 'superagent';

export const photoCreate = (photo) => ({
  type: 'PHOTO_CREATE',
  payload: photo,
});

export const photoUpdate = (photo) => ({
  type: 'PHOTO_UPDATE',
  payload: photo,
});

export const photoDelete = (photo) => ({
  type: 'PHOTO_DELETE',
  payload: photo,
});

export const photoFetch = (photo) => ({
  type: 'PHOTO_FETCH',
  payload: photo,
});

export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then(res => {
      dispatch(photoCreate(res.body));
      return res;
    });
};

export const photoUpdateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.put(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then(res => {
      dispatch(photoUpdate(res.body));
      return res;
    });
};

export const photoFetchRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/photos/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(photoFetch(res.body.data));
    });
};

export const photoDeleteRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(photoDelete(photo));
    });
};
