import {createStore, applyMiddleware} from 'redux';
import combineReducer from '../reducer/combine-reducer.js';
import reduxReporter from './redux-reporter.js';

let appStoreCreate = () => createStore(combineReducer, applyMiddleware(reduxReporter));

export default appStoreCreate;
