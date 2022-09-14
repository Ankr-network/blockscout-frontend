module.exports = {
  plugins: [
    'autoprefixer',
    'postcss-nested',
    'css-mqpacker',
    [
      'cssnano',
      {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
    ],
  ],
};
