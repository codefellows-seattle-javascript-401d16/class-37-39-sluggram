export const renderIf = (condition, component, alternative = null) => (
  condition ? component : alternative
);

export const classToggler = (config) => (
  Object.keys(config).filter(key => config[key]).join(' ')
);
