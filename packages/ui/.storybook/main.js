const overrideConfig = require('../config-overrides');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: config => {
    const withCra = overrideConfig(config);

    withCra.plugins = withCra.plugins.filter(
      plugin => plugin.constructor.name !== 'ESLintWebpackPlugin',
    );

    return withCra;
  },
};
