import superagent from 'superagent'

//sync
export const tokenSet = token => ({ type: 'TOKEN_SET', payload: token })

export const tokenDelete = token => ({ type: 'TOKEN_DELETE' })

//async
export const signupRequest = user => dispatch => {
  return superagent
    .post(`${__API_URL__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      dispatch(tokenSet(res.text))
    })
}
