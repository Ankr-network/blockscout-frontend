const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const shouldUseSourceMap = process.env.SOURCEMAPS === 'true';

module.exports = {
  entry: './src/index.ts',
  devtool: shouldUseSourceMap && 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'AnkrStakingModal',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: shouldUseSourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: shouldUseSourceMap,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/html/index.html',
      filename: './index.html',
    }),
    new ESLintPlugin(),
  ],
};
