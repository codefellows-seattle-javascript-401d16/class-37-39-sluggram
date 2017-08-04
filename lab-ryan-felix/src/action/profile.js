import superagent from 'superagent';
import { CREATE_PROFILE, UPDATE_PROFILE } from './actions.js';
import simpleAction from './simple-action.js';
import { log } from '../lib/loggers.js';

export const createProfile = simpleAction(CREATE_PROFILE);
export const updateProfile = simpleAction(UPDATE_PROFILE);

export const requestCreateProfile = profile => (dispatch, getState) => {
  console.log('hi')
  let { auth } = getState();
  console.log(auth)
  return superagent.post(`${__API_URI__}/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      console.log('received res')
      dispatch(createProfile(res.body));
      return res;
    });
};
