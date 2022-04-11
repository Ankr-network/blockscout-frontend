import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';
import svg from 'rollup-plugin-svg';
import copy from 'rollup-plugin-copy-assets';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

import { name } from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: false,
    },
  ],
  context: 'window',
  plugins: [
    replace({
      preventAssignment: true,
      values: { __packageName__: name },
    }),
    external({
      exclude: ['common', 'ui'],
    }),
    resolve({
      extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: false,
    }),
    babel({
      exclude: /node_modules/,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      babelHelpers: 'runtime',
    }),
    commonjs({
      include: /node_modules/,
    }),
    json(),
    svg(),
    copy({
      assets: ['src/assets/fonts'],
    }),
    // terser(),
  ],
};
