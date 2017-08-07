import reducer from '../reducer'
import react from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunk from './redux-thunk.js'
import reporter from './redux-reporter.js'
let appStoreCreate = () => createStore(reducer, applyMiddleware(thunk, reporter))

export default appStoreCreate
