import superagent from 'superagent';

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,
});

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
});

export const profileFetch = (profile) => ({
  type: 'PROFILE_FETCH',
  payload: profile,
});

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState();

  return superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      console.log('___profileCreateRequest getState', getState());
      let CookieProfile = JSON.stringify(Object.assign({}, res.body));
      dispatch(profileCreate(res.body));

      try{
        localStorage.profile = JSON.stringify(res.body);
      }catch(error){
        console.log('FAILED to store profile info on localStorage', error);
      }
      return res;
    });
};

export const profileUpdateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState();
  console.log('__PROFILE_ACTIONS__ getState', getState());

  return superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      let CookieProfile = JSON.stringify(Object.assign({}, res.body));
      dispatch(profileUpdate(res.body));

      try{
        localStorage.profile = JSON.stringify(res.body);
      }catch(error){
        console.log('FAILED to store updated profile info on localStorage', error);
      }
      return res;
    });
};

export const profileFetchRequest = (token) => (dispatch, getState) => {
  let {auth} = getState();

  return superagent.get(`${__API_URL__}/profiles/me`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      console.log('profileFetchRequest', res.body);
      dispatch(profileCreate(res.body));
    });
};
