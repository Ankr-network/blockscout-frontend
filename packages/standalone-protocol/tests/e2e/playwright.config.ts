import { PlaywrightTestConfig } from '@playwright/test';

import { TIMEOUTS } from './constants';

const { CI } = process.env;

const config: PlaywrightTestConfig = {
  timeout: TIMEOUTS.oneMinute * 10,
  globalTimeout: TIMEOUTS.oneMinute * 20,
  reportSlowTests: null,
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1440, height: 900 },
    locale: 'en-US',
    trace: 'on-first-retry',
    video: 'off',
    screenshot: 'on',
    actionTimeout: TIMEOUTS.big,
    navigationTimeout: TIMEOUTS.big,
  },
  projects: [{ name: 'healthCheck', testDir: './__tests__/healthCheck' }],
  testDir: './__tests__',
  workers: 1,
  retries: CI ? 1 : 0,
  reporter: CI
    ? [['github'], ['list'], ['html', { outputFolder: './test-results/html-report', open: 'on-failure' }]]
    : [['list'], ['html', { outputFolder: './test-results/html-report', open: 'on-failure' }]],
};
export default config;
