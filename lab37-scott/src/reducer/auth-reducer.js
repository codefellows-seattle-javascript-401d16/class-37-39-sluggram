export default (state=null, action) => {

  let {type, payload} = action;
  console.log('payload: ', payload);
  switch (type) {

  case 'TOKEN_SET':
    return payload;

  case 'TOKEN_DESTROYONLOGOUT':
    return null;

  default: return state;

  }
};
