import { SET_TOKEN, DELETE_TOKEN } from '../action/actions.js';

const reducer = {
  [SET_TOKEN]: (state, { type, payload }) => ({
    auth: {
      token: payload,
    },
  }),

  [DELETE_TOKEN]: (state, { type, payload }) => ({
    auth: {
      token: null,
    },
  }),
};

export default reducer;
