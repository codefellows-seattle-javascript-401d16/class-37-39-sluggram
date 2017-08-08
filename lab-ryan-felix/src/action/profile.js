import superagent from 'superagent';
import { CREATE_PROFILE, UPDATE_PROFILE } from './actions.js';
import simpleAction from './simple-action.js';
import { log } from '../lib/loggers.js';

export const createProfile = simpleAction(CREATE_PROFILE);
export const updateProfile = simpleAction(UPDATE_PROFILE);

export const requestCreateProfile = profile => (dispatch, getState) => {
  const { auth } = getState();
  return superagent.post(`${__API_URI__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .withCredentials()
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      dispatch(createProfile(res.body));
      return res;
    });
};
