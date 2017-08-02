import superagent from 'superagent';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenDestroy = () => ({
  type: 'TOKEN_DESTROY',
});
