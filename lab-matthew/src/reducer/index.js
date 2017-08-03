import {combineReducers} from 'redux'
import auth from './auth.js'
import photos from './photo.js'
import profile from './profile.js'

export default combineReducers({
  auth,
  photos,
  profile,
})
