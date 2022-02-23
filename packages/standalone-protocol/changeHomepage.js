const copy = require('./copy');

copy({
  input: './package.json',
  output: './package.json',
  find: `"homepage": "(.*)"`,
  replace: `"homepage": "${process.env.REACT_APP_CHAIN_ID}"`,
});
