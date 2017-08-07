import {createStore, applyMiddleware} from 'redux';
import combineReducer from '../reducer/combine-reducer.js';
import reduxReporter from './redux-reporter.js';
import reduxThunkPromise from './redux-thunk-promise.js';

let appStoreCreate = () => createStore(combineReducer, applyMiddleware(reduxThunkPromise, reduxReporter));

export default appStoreCreate;
