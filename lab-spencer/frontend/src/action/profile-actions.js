import superagent from 'superagent';

export const profileCreate = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile,
});

export const profileUpdate = profile => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
});

export const profileCreateRequest = profile => (dispatch, getState) =>
  superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${getState().auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      dispatch(profileCreate(res.body));
      return res;
    });
