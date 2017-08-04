import {createStore, applyMiddleware} from 'redux';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import reducer from '../reducer';

let appStoreCreate = () =>
  createStore(reducer, applyMiddleware(thunk, reporter));

export default appStoreCreate;
