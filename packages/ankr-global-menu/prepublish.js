const path = require('path');
const fs = require('fs');

const cwd = process.cwd();

const isRevert = process.argv[2] === 'revert';

const packageJsonPath = path.resolve(cwd, './package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

const changedPackageJson = {
  ...packageJson,
  main: `./${isRevert ? 'src' : 'build'}/index.${isRevert ? 'ts' : 'js'}`,
  types: `./${isRevert ? 'src' : 'build'}/index${isRevert ? '.ts' : '.d.ts'}`,
};

fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(changedPackageJson, null, '\t'),
  'utf-8',
);
