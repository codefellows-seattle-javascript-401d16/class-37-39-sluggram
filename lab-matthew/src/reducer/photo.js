export default (state=[], action) => {
  let {type, payload} = action
  switch(type){
  case 'PHOTO_CREATE':
    return [...state, payload]
  case 'PHOTO_UPDATE':
    return [...state, ...payload]
  case 'PHOTO_FETCH':
    return [...state, ...payload]
  case 'PHOTO_DELETE':
    return state = state.filter(photo => photo._id !== payload._id)
  default:
    return state
  }
}
