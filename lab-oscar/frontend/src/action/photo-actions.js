import superagent from 'superagent';

export const photoCreate = (photo) => ({
  type: 'PHOTO_CREATE',
  payload: photo,
});

export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photoURI)
    .then(res => {
      dispatch(photoCreate(res.body));
      return res;
    });
};

// export const profileUpdate = (profile) => ({
//   type: 'PROFILE_UPDATE',
//   payload: profile,
// });
