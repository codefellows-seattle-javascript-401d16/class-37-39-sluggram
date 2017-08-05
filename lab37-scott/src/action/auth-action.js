import superagent from 'superagent';
import * as util from '../lib/util.js';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenDestroyOnLogout = () => {
  util.deleteCookie('X-Sluggram-Token');
  return {type: 'TOKEN_DESTROYONLOGOUT'};
};

//start the async requests

export const signupRequest = (user) => (dispatch) => {
  console.log('hit sign up');
  return superagent.post(`${__API_URL__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      console.log('token: ', res.text);
      dispatch(tokenSet(res.text));
      //put the token in local storage
      try{
        console.log('break 5');
        localStorage.token = res.text;
      } catch(err){
        console.log('error: ', err);
        // return err;
      }
      console.log('break6');
      return res;
    })
    .catch(console.error);
};

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      console.log('login token:', res.text);
      dispatch(tokenSet(res.text));
      return res;
    });
};
