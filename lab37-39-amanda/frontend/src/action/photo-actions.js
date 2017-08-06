import superagent from 'superagent'

export const userPhotoSet = (photo) => ({
  type:'USER_PHOTO_SET',
  payload: photo,
})

export const userPhotoCreate = (photo) => ({
  type:'USER_PHOTO_CREATE',
  payload: photo,
})

export const userPhotoUpdate = (photo) => ({
  type:'USER_PHOTO_SET',
  payload: photo,
})

export const userPhotoDelete = (photos) => ({
  type:'USER_PHOTO_DELETE',
  payload: photos,
})

export const userPhotoFetchRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.get(`${__API_URL__}/photos/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then((res) => {
      dispatch(userPhotoSet(res.body.data))
      return res
    })
}

export const userPhotoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then((res) => {
      dispatch(userPhotoCreate(res.body))
      return res
    })
}

export const userPhotoDeleteRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.delete(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then((res) => {
      dispatch(userPhotoDelete(res.body))
      return res
    })
}

export const userPhotoUpdateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.put(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then((res) => {
      dispatch(userPhotoUpdate(res.body))
      return res
    })
}
