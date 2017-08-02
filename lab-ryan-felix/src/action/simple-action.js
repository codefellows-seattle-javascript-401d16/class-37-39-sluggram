const simpleAction = action => payload => ({
  type: action,
  payload,
});

export default simpleAction;
