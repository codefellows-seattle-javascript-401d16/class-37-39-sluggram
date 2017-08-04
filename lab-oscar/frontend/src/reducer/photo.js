export default (state=null, action) => {
  let {type, payload} = action;
  switch (type) {
  case 'PHOTO_CREATE':
    return payload;
  case 'PHOTO_FETCH':
    return payload;
  case 'PHOTO_DELETE':
    return state = state.filter(photo => photo._id !== payload._id);
  case 'PHOTO_UPDATE':
    return state = state.map(photo => photo._id === payload._id ? payload : photo);
  default:
    return state;
  }
};


// case 'EXPENSE_DELETE':
//      validateExpenses(payload)
//      oldState = state[payload.categoryID].filter(expense => expense.id !== payload.id)
//      return {...state, [payload.categoryID]: oldState}
//      break;
