let validateProfileCreate = profile => {
  if (
    !profile.bio ||
    !profile.avatar ||
    !profile._id ||
    !profile.owner ||
    !profile.username ||
    !profile.email
  )
    throw new Error('ERROR: all profile fields must be populated.')
}

export default (state = null, action) => {
  let { type, payload } = action

  switch (type) {
  case 'PROFILE_CREATE':
    console.log('profile.js', payload)
    validateProfileCreate(payload)
    localStorage.setItem('profile', JSON.stringify(payload))
    return payload

  case 'PROFILE_UPDATE':
    if (!state) throw new Error('ERROR: can not update, profile is null.')
    validateProfileCreate(payload)
    return { ...state, ...payload }

  case 'LOGOUT':
    return null

  default:
    return state
  }
}
