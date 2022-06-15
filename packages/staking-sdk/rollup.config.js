import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';

export default {
  input: './index.ts',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: false,
    },
  ],
  context: 'window',
  plugins: [
    external({
      exclude: ['common', 'ui', 'polkadot'],
    }),
    resolve({
      extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
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
  ],
};
