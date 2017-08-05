import superagent from 'superagent';
//sync actions talk to redux store

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,

});

export const profileSet = (profile) => {
  console.log('profile set profile: ', profile);
  return {type: 'PROFILE_SET',
    payload: profile,
  };
};

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,

});

//async ajax calls. make sure user has token to auth create profile.
export const profileCreateRequest = (profile) => (dispatch, getState) => {
  console.log('profreq PROF: ', profile);
  //pull the token off the auth state
  let {auth} = getState();
  console.log('auth', {auth});
  //use auth.token and send in as bearer auth
  return superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .attach('avatar', profile.avatar)
    .field('bio', profile.bio)
    .then(res => {
      console.log('resbody: ', res.body);
      //create the profile that sets the state
      dispatch(profileCreate(res.body));
      //return the res back to the handle profile create
      return res.body;
    });
};

//get the profile just after login. It's invoked on the auth-action login
export const profileGetRequest = (token) => (dispatch, getState) => {
  console.log('prof get req token: ', token);
  let auth = token;
  return superagent.get(`${__API_URL__}/profiles/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      console.log('PGR resbody: ', res.body);
      dispatch(profileSet(res.body));
    });
};
