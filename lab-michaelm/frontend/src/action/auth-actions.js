import superagent from 'superagent';
import {logError, log} from '../lib/util.js';

// sync actions for updating store
export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenDelete = () => ({
  type: 'TOKEN_DELETE',
});

export const logout = () => ({
  type: 'LOGOUT',
});

// async actions
export const signupRequest =  (user) => (dispatch) => {
  return superagent.post(`${__API_URL__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      dispatch(tokenSet(res.text));
      try {
        localStorage.token = res.text;
      } catch (error) {
        logError(error);
      }
      return res;
    })
    .catch(logError());
};

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      dispatch(tokenSet(res.text));
      try {
        localStorage.token = res.text;
      } catch (err) {
        logError(err);
      }
      return res;
    })
    .catch(logError());
};
