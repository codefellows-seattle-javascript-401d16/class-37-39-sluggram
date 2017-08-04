let validateProfileCreate = profile => {
  if(!profile.avatar)
    throw new Error('VALIDATION ERROR: Profile is missing an avatar');
  if(!profile.bio)
    throw new Error('VALIDATION ERROR: Profile is missing an bio');
  if(!profile._id)
    throw new Error('VALIDATION ERROR: Profile is missing an _id');
  if(!profile.owner)
    throw new Error('VALIDATION ERROR: Profile is missing an owner');
  if(!profile.username)
    throw new Error('VALIDATION ERROR: Profile is missing an username');
  if(!profile.email)
    throw new Error('VALIDATION ERROR: Profile is missing an email');
};

export default (state = null, action) => {
  let {type, payload} = action;
  switch(type) {
  case 'PROFILE_CREATE':
    validateProfileCreate(payload);
    return payload;
  case 'PROFILE_UPDATE':
    if(!state)
      throw new Error('USAGE ERROR: Cannot update a profile when state is null');
    validateProfileCreate(payload);
    return {...state, ...payload};
  case 'SIGNOUT':
    return null;
  default:
    return state;
  }
};
