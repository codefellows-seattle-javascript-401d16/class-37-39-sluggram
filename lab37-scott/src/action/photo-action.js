import superagent from 'superagent';

export const photoCreate = (photo) => ({
  type: 'PHOTO_CREATE',
  payload: photo,
});

//set any posted photos in the db to the state -> display to dash
export const photoFetch = (photos) => ({
  type: 'PHOTO_FETCH',
  payload: photos,
});

export const photoUpdate = (photo) => ({
  type: 'PHOTO_UPDATE',
  payload: photo,
});

export const photoDestroy = (photo) => ({
  type: 'PHOTO_DESTROY',
  payload: photo,
});

//put async superagent actions here.
export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .attach('photo', photo.photoURL)
    .field('description', photo.description)
    .then(res => {
      dispatch(photoCreate(res.body));
      return res;
    });
};

export const photosFetchRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  console.log('PCR auth: ', {auth});

  return superagent.get(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      console.log('PSR res: ', res.body);
      dispatch(photoFetch(res.body.data));
      return res;
    });

};
