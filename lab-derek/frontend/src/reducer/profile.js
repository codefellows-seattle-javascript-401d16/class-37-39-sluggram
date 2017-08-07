let validateProfileCreate = (profile) => {
  if(!profile.avatar || !profile.bio)
    throw new Error('VALIDATION ERROR: profile requires avatar and bio');
};

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'PROFILE_CREATE':
    validateProfileCreate(payload);
    return payload;

  case 'PROFILE_UPDATE':
    if(!state)
      throw new Error('USAGE ERROR: cannot update when profile is null');
    return {...state, payload};

  case 'LOGOUT':
    return null;

  default:
    return state;
  }
};
