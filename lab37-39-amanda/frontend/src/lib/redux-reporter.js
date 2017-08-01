import * as util from '.util.js'

export default store => next => action => {
  try{
    let result = next(action)
    util.log('___STATE___', store.getState())
    return result
  } catch(err){
    err.action = action
    util.logError('__ERROR___', err)
    return err
  }
}
