let profileValidator = (profile) => {
  if (!profile.avatar || !profile.bio || !profile._id || !profile.username || !profile.email || !profile.owner)
    throw new Error('validation error: profile needs all fields');
};

export default (state={}, action) => {
  let {type, payload} = action;
  switch(type){
  case 'PROFILE_CREATE':
    profileValidator(payload);
    return payload;

  case 'PROFILE_SET':
    return payload;

  case 'PROFILE_UPDATE':
    if(!state) throw new Error('usage error: profile is null, cannot update');
    profileValidator(payload);
    return {...state, ...payload};

  case 'PROFILE_DELETE':
    return ;
  default: return state;
  }
};
