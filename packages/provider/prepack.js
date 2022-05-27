const path = require('path');
const fs = require('fs');

const cwd = process.cwd();

const packageJsonPath = path.resolve(cwd, './package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

const changedPackageJson = {
  ...packageJson,
  name: '@ankr.com/provider',
  main: './build/index.js',
  types: './build/index.d.ts',
};

fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(changedPackageJson, null, '\t'),
  'utf-8',
);
