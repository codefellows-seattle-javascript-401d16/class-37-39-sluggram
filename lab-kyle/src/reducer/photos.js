export default (state = [], action) => {
  let { type, payload } = action

  switch (type) {
  case 'PHOTO_SUBMIT':
    return [...state, payload]

  default:
    return state
  }
}
