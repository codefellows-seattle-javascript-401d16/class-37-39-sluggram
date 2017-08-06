import superagent from 'superagent';

export const photoCreate = (photo) => ({
  type: 'PHOTO_CREATE',
  payload: photo,
})

export const photoFetch = (photos) => ({
  type: 'PHOTO_FETCH',
  payload: photos,
})

export const photoUpdate = (photo) => ({
  type: 'PHOTO_UPDATE',
  payload: photo,
})

export const photoDelete = (photo) => ({
  type: 'PHOTO_DELETE',
  payload: photo,
})

export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos`)
  .set('Authorization', `Bearer ${auth}`)
  .field('description', photo.description)
  .attach('photo', photo.image)
  .then(res => {
    dispatch(photoCreate(res.body));
    return res;
  })
  .catch(error => console.log('error', error););
}

export const photoFetchRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/photos`)
  .set('Authorization', `Bearer ${auth}`)
  .then(res => {
    dispatch(photoFetch(res.body.data));
    return res;
  })
  .catch(error => console.log('error', error););
}

export const photoUpdateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos/${photo._id}`)
  .set('Authorization', `Bearer ${auth}`)
  .then(res => {
    dispatch(photoUpdate(photo));
    return res;
  })
  .catch(error => console.log('error', error););
}
export const photoDeleteRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/photos/${photo._id}`)
  .set('Authorization', `Bearer ${auth}`)
  .then(res => {
    dispatch(photoDelete(photo));
    return res;
  })
  .catch(error => console.log('error', error););
}
