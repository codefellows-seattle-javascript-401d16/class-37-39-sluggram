import superagent from 'superagent'

//sync
export const photoSubmit = photo => ({
  type: 'PHOTO_SUBMIT',
  payload: photo,
})

export const photoDelete = photo => ({
  type: 'PHOTO_DELETE',
  payload: photo,
})

//async
export const photoSubmitRequest = photo => (dispatch, getState) => {
  let { auth, profile } = getState()
  console.log('photoSubmitRequest', photo)
  return superagent
    .post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .field('profile', profile)
    .attach('photo', photo.url)
    .then(res => {
      console.log('photoSubmitResponse', res)
      dispatch(photoSubmit(res.body))
      return res
    })
}
