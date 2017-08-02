//this component allows us to make asynchronous call to an API and after it finishes we call the action
//creator to dispatch to the store.

export default store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
