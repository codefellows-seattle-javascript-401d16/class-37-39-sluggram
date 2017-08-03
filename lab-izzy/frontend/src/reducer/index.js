import {combineReducers} from 'redux';
import profile from './profile.js';
import auth from './auth.js';

export default combineReducers({
  auth,
  profile,
});
