import authReducer from './auth.js';
import { SET_TOKEN, DELETE_TOKEN, LOGOUT } from '../action/actions.js';

describe('auth reducer', () => {

  test('SET_TOKEN action should return an object with auth:token property', () => {
    const result = authReducer[SET_TOKEN]({}, { payload: 'abc123'});
    expect(result).toEqual({ auth: { token: 'abc123' } });
  });

  test('DELETE_TOKEN action should return an object with auth:token = null', () => {
    const result = authReducer[DELETE_TOKEN]();
    expect(result).toEqual({ auth: { token: null } });
  });

  test('LOGOUT action should return an object with auth = null', () => {
    const result = authReducer[LOGOUT]();
    expect(result).toEqual({ auth: null });
  });

});
