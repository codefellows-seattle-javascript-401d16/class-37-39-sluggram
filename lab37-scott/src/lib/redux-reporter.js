export default store => next => action => {
  //log all actions that fire
  console.log('--ACTION--', action);

  try {
    let result = next(action);
    console.log('--STATE-CHANGE--', store.getState());
    //return the value of the action
    return result;
  } catch (err) {
    action.err = action;
    console.error();('--ERROR--', err);
    return err;
  } 
};
