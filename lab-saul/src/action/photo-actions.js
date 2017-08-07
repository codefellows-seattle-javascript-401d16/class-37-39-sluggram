import superagent from 'superagent'

// sync action creators

export const photoCreate = (photo) => ({
  type: 'PHOTO_CREATE',
  payload: photo,
})

export const photoUpdate = (photo) => ({
  type: 'PHOTO_UPDATE',
  payload: photo,
})

// async action creators

export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState()
  console.log('photo', photo)
  return superagent.post(`${__API_URL__}/photos`)
  .set('Authorization', `Bearer ${auth}`)
  .field('description', photo.description)
  .attach('photo', photo.image)
  .then(res => {
    console.log('res', res)
    dispatch(photoCreate(res.body))
    return res
  })
  .catch(error => console.log('error', error))
}
