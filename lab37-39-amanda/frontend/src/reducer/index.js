// require('babel-register')
// require('./scr/main.js')
import auth from './auth.js'
import profile from './profile.js'

export default combineReducers({
  auth, profile,
})
