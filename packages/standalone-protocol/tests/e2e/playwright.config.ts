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
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
    trace: 'on-first-retry',
    video: 'off',
    screenshot: 'on',
    actionTimeout: TIMEOUTS.big,
    navigationTimeout: TIMEOUTS.big,
  },
  projects: [{ name: 'healthCheck', testDir: './__tests__/healthCheck' }],
  workers: 1,
  retries: CI ? 1 : 0,
  reporter: CI
    ? [['github'], ['list']]
    : [['list'], ['html', { outputFolder: './test-results/html-report', open: 'on-failure' }]],
};
export default config;
