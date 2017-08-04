import {combineReducers} from 'redux';
import auth from './auth-reducer.js';
import profile from './profile-reducer.js';

export default combineReducers({
  auth,
  profile,
});
