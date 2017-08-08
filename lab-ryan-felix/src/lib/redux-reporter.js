import { log, error, dir } from './loggers.js';

const reduxReporter = store => next => action => {
  log('Action: ', action);
  try {
    let result = next(action);
    log('State: ');
    dir(store.getState());
    return result;
  } catch(err) {
    err.action = action;
    error('Error: ', err);
    return err;
  }
};

export default reduxReporter;
