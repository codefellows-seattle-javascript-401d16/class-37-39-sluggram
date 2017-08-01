import superagent from 'superagent';

export const tokenSet = token => ({type: 'TOKEN_SET', payload: token});

export const tokenDelete = token => ({type: 'TOKEN_DELETE'});

export const userSignUpRequest = user => (dispatch, getState) =>
  superagent.post(`${__API_URL__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      dispatch(tokenSet(res.text));
      return res;
    });

export const userSignInRequest = user => (dispatch, getState) =>
  superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      dispatch(tokenSet(res.text));
      return res;
    });
