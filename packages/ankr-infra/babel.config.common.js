const presets = [
  [
    '@babel/preset-env',
    {
      exclude: ['transform-exponentiation-operator'],
    },
  ],
  ['@babel/preset-react', { runtime: 'automatic' }],
  '@babel/preset-typescript',
];

const plugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-proposal-private-methods', { loose: true }],
  ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
  ['@babel/plugin-transform-nullish-coalescing-operator', { loose: true }],
  [
    '@babel/plugin-transform-runtime',
    {
      useESModules: false,
      version: '^7.4.4',
    },
  ],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

module.exports = {
  presets,
  plugins,
  exclude: 'node_modules/**',
};
