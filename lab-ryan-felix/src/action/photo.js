import superagent from 'superagent';
import simpleAction from './simple-action.js';
import { CREATE_PHOTO, UPDATE_PHOTO, DELETE_PHOTO } from './actions.js';
import { log } from '../lib/loggers.js';

export const createPhoto = simpleAction(CREATE_PHOTO);
export const updatePhoto = simpleAction(UPDATE_PHOTO);
export const deletePhoto = simpleAction(DELETE_PHOTO);

export const requestPopulatePhotos = (num = 10) => dispatch => {
  return superagent.get(`${__API_URI__}/photos`)
    .then(res => {
      res.body.data.forEach(photo => dispatch(createPhoto(photo)));
    });
};

export const requestCreatePhoto = photo => (dispatch, getState) => {
  const { auth } = getState();
  return superagent.post(`${__API_URI__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then(res => {
      dispatch(createPhoto(res.body));
      return res;
    });
};

export const requestUpdatePhoto = photo => (dispatch, getState) => {
  const { auth } = getState();
  return superagent.put(`${__API_URI__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then(res => {
      dispatch(createPhoto(res.body));
      return res;
    });
};

export const requestDeletePhoto = photo => (dispatch, getState) => {
  const { auth } = getState();
  return superagent.delete(`${__API_URI__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .send()
    .then(res => {
      dispatch(deletePhoto(photo._id));
    });
};
