import superagent from 'superagent';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenDestroyOnLogout = () => ({
  type: 'TOKEN_DESTROYONLOGOUT',
});

//start the async requests

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${__API_URL_}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      console.log('token: ', res.text);
      dispatch(tokenSet(res.text));
      //put the token in local storage
      try{
        localStorage.token = res.text;
      } catch(err){
        console.log('error: ', err);
      }
      return res;
    });
};
