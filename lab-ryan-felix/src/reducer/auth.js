import { SET_TOKEN, DELETE_TOKEN, LOGOUT } from '../action/actions.js';

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

  [LOGOUT]: () => ({
    auth: null,
  }),
};

export default reducer;
