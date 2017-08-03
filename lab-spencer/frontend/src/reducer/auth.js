export default (state = null, action) => {
  let {type, payload} = action;
  switch(type) {
  case 'TOKEN_SET':
    return payload;
  case 'SIGNOUT':
    return null;
  default:
    return state;
  }
};
