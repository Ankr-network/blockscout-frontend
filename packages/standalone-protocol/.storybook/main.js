const process = require('process');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: config => {
    config.resolve.modules.push(process.cwd() + '/node_modules');
    config.resolve.modules.push(process.cwd() + '/src');

    // this is needed for working w/ linked folders
    config.resolve.symlinks = false;

    return config;
  },
};