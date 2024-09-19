const config = require('@ankr.com/infra/babel.config.common');

module.exports = api => {
  api.cache(true);

  return {
    ...config,
    plugins: [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-syntax-nullish-coalescing-operator',
      '@babel/plugin-transform-nullish-coalescing-operator',
      ...config.plugins,
    ],
  };
};
