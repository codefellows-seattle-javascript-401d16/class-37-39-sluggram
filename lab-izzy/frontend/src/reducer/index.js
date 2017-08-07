import {combineReducers} from 'redux';
import profile from './profile.js';
import photos from './photo.js';
import auth from './auth.js';

export default combineReducers({
  auth,
  profile,
  photos,
});
