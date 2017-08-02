import superagent from 'superagent'

//sync
export const photoSubmit = photo => ({
  type: 'PHOTO_SUBMIT',
  payload: photo,
})

//async
export const photoSubmitRequest = photo => (dispatch, getState) => {
  let { auth } = getState()
  console.log('photoSubmitRequest', photo)
  return superagent
    .post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('url', photo.url)
    .then(res => {
      console.log('photoSubmitRequest', res)
      dispatch(photoSubmit(res.body))
      return res
    })
}
