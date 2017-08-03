export default (state = {}, action) => {
  let { type, payload } = action

  switch (type) {
  case 'PHOTO_SUBMIT':
    return { ...state, cards: [...state.cards, payload] }

  default:
    return state
  }
}
