import { SET_TOKEN, DELETE_TOKEN, LOGOUT } from '../action/actions.js';

const reducer = {
  [SET_TOKEN]: (state, { payload }) => ({
    auth: {
      token: payload,
    },
  }),

  [DELETE_TOKEN]: () => ({
    auth: {
      token: null,
    },
  }),

  [LOGOUT]: () => ({
    auth: null,
  }),
};

export default reducer;
