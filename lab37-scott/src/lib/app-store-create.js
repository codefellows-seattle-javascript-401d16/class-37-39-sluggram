import {createStore, applyMiddleware} from 'redux';
import combineReducer from '../reducer/combine-reducer.js';


let appStoreCreate = () => createStore(combineReducer, applyMiddleware());

export default appStoreCreate;
