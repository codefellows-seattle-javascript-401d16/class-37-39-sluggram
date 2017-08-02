import superagent from 'superagent'

//sync
export const profileCreate = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile,
})

export const profileUpdate = profile => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
})

//async
export const ProfileCreateRequest = profile => (dispatch, getState) => {
  let { auth } = getState()
  return superagent
    .post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      dispatch(profileCreate(res.body))
      return res
    })
}
