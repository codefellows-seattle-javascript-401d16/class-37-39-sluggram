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

export const profileFetch = () => ({
  type: 'PROFILE_FETCH',
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

export const profileFetchRequest = (user) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.get(`${__API_URL__}/profiles:${user._id}`)
  .then(res => {
    console.log('profileFetchRequest', res.body)
    dispatch(profileFetch(res.body))
  })
}
