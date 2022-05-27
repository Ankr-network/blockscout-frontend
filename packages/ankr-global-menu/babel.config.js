const config = require('@ankr.com/infra/babel.config.common');

module.exports = api => {
  api.cache(true);

  return {
    ...config,
    plugins: [...config.plugins, 'inline-react-svg'],
  };
};
