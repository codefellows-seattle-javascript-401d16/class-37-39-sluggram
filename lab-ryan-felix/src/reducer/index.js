import auth from './auth.js';

const initialState = {
  auth: null,
};

const reducers = [auth];

/*
  Build map from reducer functions to validators.
*/
const validators = new Map();
reducers.forEach(reducer => {
  if(reducer.hasOwnProperty('validator')) {
    for(let key in reducer) {
      if(reducer.hasOwnProperty(key)) {
        validators.set(key, reducer.validator);
      }
    }
  }
});

const noOp = () => {};
const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if(handlers.hasOwnProperty(action.type)) {
      const validate = validators.get(action.type) || noOp;
      validate(action.payload);
      return Object.assign({}, state, handlers[action.type](state, action));
    } else {
      return state;
    }
  };
};

const combinedReducer = reducers.reduce((combined, reducer) => ({ ...combined, ...reducer }));
export default createReducer(initialState, combinedReducer);
