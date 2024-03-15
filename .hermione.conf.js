module.exports = {
  gridUrl: 'http://localhost:4444',
  baseUrl: 'https://www.ankr.com',
  pageLoadTimeout: 0,
  httpTimeout: 60000,
  urlHttpTimeout: 20000,
  testTimeout: 90000,
  resetCursor: false,
  screenshotMode: 'viewport', // fullpage/viewport
  screenshotDelay: 2500,
  takeScreenshotOnFailsTimeout: 30000,

  sets: {
    desktop: {
      files: ['tests/**/*.hermione.mjs'],
      browsers: ['chrome'],
    },
  },
  browsers: {
    chrome: {
      automationProtocol: 'webdriver', // webdriver/devtools
      desiredCapabilities: {
        browserName: 'chrome',
      },
      windowSize: {
        width: 1920,
        height: 2000,
      },
    },
  },
  plugins: {
    'html-reporter/hermione': {
      // https://github.com/gemini-testing/html-reporter
      enabled: true,
      path: 'report',
      defaultView: 'all',
      diffMode: '3-up-scaled',
    },
  },
};
