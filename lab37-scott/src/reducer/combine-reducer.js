import {combineReducers} from 'redux';
import authReducer from './auth-reducer.js';
import profile from './profile.js';

export default combineReducers({
  authReducer,
  profile,
});
