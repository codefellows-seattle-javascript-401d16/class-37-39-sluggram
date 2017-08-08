import photoReducer from './photo.js';
import { CREATE_PHOTO, UPDATE_PHOTO, DELETE_PHOTO } from '../action/actions.js';

describe('photo reducer', () => {

  let state = {
    photos: [],
  };

  test('CREATE_PHOTO should create a photo', () => {
    const result = photoReducer[CREATE_PHOTO](state, { payload: {
      photo: 'raw photo here',
      description: 'a photo',
      _id: 1,
    }});
    expect(result).toEqual({
      photos: [
        {
          photo: 'raw photo here',
          description: 'a photo',
          _id: 1,
        },
      ],
    });
    state = result;
  });

  test('UPDATE_PHOTO should update a photo', () => {
    const result = photoReducer[UPDATE_PHOTO](state, { payload: {
      photo: 'different photo',
      description: 'different description',
      _id: 1,
    }});
    expect(result).toEqual({
      photos: [
        {
          photo: 'different photo',
          description: 'different description',
          _id: 1,
        },
      ],
    });
    state = result;
  });

  test('CREATE_PHOTO should leave existing photos untouched', () => {
    const result = photoReducer[CREATE_PHOTO](state, { payload: {
      photo: 'second photo',
      description: 'photo 2',
      _id: 2,
    }});
    expect(result).toEqual({
      photos: [
        {
          photo: 'different photo',
          description: 'different description',
          _id: 1,
        },
        {
          photo: 'second photo',
          description: 'photo 2',
          _id: 2,
        },
      ],
    });
    state = result;
  });

  test('DELETE_PHOTO should remove a photo', () => {
    const result = photoReducer[DELETE_PHOTO](state, { payload: {
      photo: 'different photo',
      description: 'different description',
      _id: 1,
    }});

    expect(result).toEqual({
      photos: [
        {
          photo: 'second photo',
          description: 'photo 2',
          _id: 2,
        },
      ],
    });
    state = result;
  });

  test('validator should throw on invalid photo', () => {
    expect(() => photoReducer.validator({ fun: 'yes' })).toThrow();
  });

});
