import superagent from 'superagent'

// sync action creators

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,
})

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
})

export const profileFetch = (profile) => ({
  type: 'PROFILE_FETCH',
  payload: profile,
})

// async action creators

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState()
  // console.log('auth', auth)
  // console.log('API_URL', __API_URL__)
  return superagent.post(`${__API_URL__}/profiles`)
  .set('Authorization', `Bearer ${auth}`)
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    let cookieProfile = JSON.stringify(Object.assign({}, res.body))
    dispatch(profileCreate(res.body))

    try{
      localStorage.profile = JSON.stringify(res.body)
    }catch(error){
      console.log('FAILED to store profile info into localstorage', error)
    }
    return res
  })
  // .catch(error => console.log('error', error))
}

export const profileUpdateRequest = ((profile) => (dispatch, getState) => {
  let {auth} = getState()
  let profileID = getState().profile._id
  console.log('__PROFILE-ACTIONS__ getState', profileID)

  return superagent.put(`${__API_URL__}/profiles/${profileID}`)
  .set('Authorization', `Bearer ${auth}`)
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    let cookieProfile = JSON.stringify(Object.assign({}, res.body))
    dispatch(profileUpdate(res.body))

    try{
      localStorage.profile = JSON.stringify(res.body)
    } catch (error) {
      console.log('FAILED to store updated profile info into localstorage', error)
    }
    return res
  })
})

export const profileFetchRequest = (token) => (dispatch, getState) => {
  console.log('profileFetchRequest token', token)
  return superagent.get(`${__API_URL__}/profiles/me`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    console.log('profileFetchRequest', res.body)
    dispatch(profileFetch(res.body))
  })
}
