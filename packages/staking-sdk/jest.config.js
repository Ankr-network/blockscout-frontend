/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  automock: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./src/setupTests.ts'],
  coverageReporters: ['json-summary', 'text', 'text-summary'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!**/*.d.ts'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
  globals: {
    window: {},
  },
};
