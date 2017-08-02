import superagent from 'superagent'

export const tokenSet = (token) => ({
  type: 'TOKEN SET',
  payload: token,
})

export const tokenDelete = () => ({ type: 'TOKEN_DELETE'})

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${___API_URL___}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      dispatch(tokenSet(res.text))

      try{
        localStorage.token = res.text
      } catch (error) {
        console.log(error)
      }
      return res
    })
}

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${___API_URL___}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      dispatch(tokenSet(res.text))
      return res
    })
}
