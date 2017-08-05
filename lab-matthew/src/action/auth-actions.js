import superagent from 'superagent'
import * as util from '../lib/util.js'
import * as profileActions from './profile-actions'

// sync actions for updating the store
export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const logout = () => {
  util.deleteCookie('X-Sluggram-Token')
  return {
    type: 'LOGOUT',
  }
}

// async actions
export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${__API_URL__}/signup`)
  .withCredentials()
  .send(user)
  .then(res => {
    dispatch(tokenSet(res.text))

    try {
      localStorage.token = res.text
    } catch(error) {
      console.log(error)
    }
    return res
  })
}

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/login`)
  .withCredentials()
  .auth(user.username, user.password)
  .then(res => {
    dispatch(tokenSet(res.text))

    dispatch(profileActions.profileFetchRequest(res.text))
    return res
  })
}
