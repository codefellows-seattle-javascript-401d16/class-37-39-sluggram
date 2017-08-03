import superagent from 'superagent';

//sync action creators

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,
});

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
});

// async actions creators

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      let cookieProfile = JSON.stringify(Object.assign({}, res.body));
      dispatch(profileCreate(res.body));
      try {
        localStorage.profile = JSON.stringify(res.body);
      } catch (error) {
        console.log(error);
      }
      return res;
    });
};
