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

export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', photo.bio)
    .attach('avatar', photo.avatar)
    .then(res => {
      dispatch(photoCreate(res.body));
      return res;
    });
};
