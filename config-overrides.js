const {
  removeModuleScopePlugin,
  override,
  babelInclude,
} = require('customize-cra');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('react-scripts/config/paths.js');

module.exports = function (config) {
  const esLintPluginOptions = config.plugins.splice(-1)[0].options;

  config.plugins.push(
    new ESLintPlugin({
      ...esLintPluginOptions,
      // to avoid parsing .eslintrc files from node_modules
      exclude: ['**/node_modules/**'],
      context: path.resolve(paths.appPath + '/..'),
    }),
  );

  return override(
    removeModuleScopePlugin(),
    babelInclude([
      path.resolve('src'),
      path.resolve('../ui'),
      path.resolve('../polkadot'),
      path.resolve('../provider'),
      path.resolve('../multirpc-sdk'),
      path.resolve('../common'),
      path.resolve('../ankr-global-menu'),
      path.resolve('../staking-sdk'),
      path.resolve('../admin-mrpc'),
    ]),
  )(config);
};
