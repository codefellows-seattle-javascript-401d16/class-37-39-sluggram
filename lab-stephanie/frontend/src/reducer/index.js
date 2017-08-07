import { combineReducers } from 'redux'
import auth from './auth.js'
import userProfile from './profile.js'
import userPhotos from './photo.js'

export default combineReducers({
  auth,
  userProfile,
  userPhotos,
})
