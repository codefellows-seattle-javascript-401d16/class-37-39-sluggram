import { CREATE_PROFILE, UPDATE_PROFILE } from '../action/actions.js';

const validateProfile = profile => (
  profile.avatar &&
  profile.bio &&
  profile._id &&
  profile.owner &&
  profile.username &&
  profile.email
);

const reducer = {
  [CREATE_PROFILE]: (state, { payload }) => ({
    profile: {
      ...payload,
    },
  }),

  [UPDATE_PROFILE]: (state, { payload }) => {
    if(!state.profile)
      throw new Error('Cannot update a profile that does not exist');
    return {
      profile: { ...state.profile, ...payload },
    };
  },

  validator: profile => {
    if(!validateProfile(profile))
      throw new Error('Invalid profile.');
  },

};

export default reducer;
