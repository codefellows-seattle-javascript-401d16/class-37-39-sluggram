import profileReducer from './profile.js';
import { CREATE_PROFILE, UPDATE_PROFILE } from '../action/actions.js';

describe('profile reducer', () => {

  let state = {};

  const testProfile = {
    avatar: 'a pic',
    bio: 'a bio',
    _id: 1,
    owner: 'me',
    username: 'yancy',
    password: 'hunter2',
  };

  test('UPDATE_PROFILE should throw when there is no profile to update', () => {
    expect(() => profileReducer[UPDATE_PROFILE](state, { payload: testProfile })).toThrow();
  });

  test('CREATE_PROFILE should create a profile', () => {
    const result = profileReducer[CREATE_PROFILE](state, { payload: testProfile });
    expect(result.profile).toEqual(testProfile);
    state = result;
  });

  const updatedProfile = {
    avatar: 'diff pic',
    bio: 'diff bio',
    _id: 1,
    owner: 'you',
    username: 'thor',
    password: 'correcthorsebatterystaple',
  };

  test('UPDATE_PROFILE should update a profile', () => {
    const result = profileReducer[UPDATE_PROFILE](state, { payload: updatedProfile });
    expect(result.profile).toEqual(updatedProfile);
  });

});
