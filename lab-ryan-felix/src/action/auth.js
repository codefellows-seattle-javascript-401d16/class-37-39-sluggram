import superagent from 'superagent';
import { SET_TOKEN, DELETE_TOKEN, LOGOUT } from './actions.js';
import simpleAction from './simple-action.js';

export const setToken = simpleAction(SET_TOKEN);
export const deleteToken = simpleAction(DELETE_TOKEN);
export const logout = simpleAction(LOGOUT);

console.log('API URI: ', __API_URI__);

export const requestSignup = user => dispatch => (
  superagent.post(`${__API_URI__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      dispatch(setToken(res.text));
      try {
        localStorage.token = res.text;
      } catch(err) {
        console.error(err);
      }
      return res;
    })
);

export const requestLogin = user => dispatch => (
  superagent.get(`${__API_URI__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      dispatch(setToken(res.text));
      return res;
    })
);
