import { expect, Page, test } from '@playwright/test';

import { NON_LEGACY_STANDALONES, TIMEOUTS } from '../../constants';

test.describe('data refresh', async () => {
  test(`should be every 30s @slow`, async ({ context }) => {
    const tests = [];
    for (const NON_LEGACY_STANDALONE of NON_LEGACY_STANDALONES) {
      tests.push(testFn(await context.newPage(), NON_LEGACY_STANDALONE));
    }
    await Promise.all(tests);
  });
});

async function testFn(page: Page, NON_LEGACY_STANDALONE: { network: string; endPoint: string }) {
  const respArr1 = [];
  const respArr2 = [];
  const respArr3 = [];
  const respArr4 = [];
  page.on('response', async response => {
    if (response.url().includes(`/api/v1/stats/${NON_LEGACY_STANDALONE.network}/24h`)) {
      respArr1.push(await response.json());
    }
    if (response.url().includes(`/api/v1/node?blockchain=${NON_LEGACY_STANDALONE.network}`)) {
      respArr2.push(await response.json());
    }
    if (response.url().includes(`/api/v1/weight`)) {
      respArr3.push(await response.json());
    }
    if (response.url().includes(`/api/v1/blockchain`)) {
      respArr4.push(await response.json());
    }
  });

  await test.step(`navigate to ${NON_LEGACY_STANDALONE.endPoint} and wait`, async () => {
    await page.goto(NON_LEGACY_STANDALONE.endPoint);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(TIMEOUTS.oneMinute * 1.5);
  });

  await test.step('verify api requests', async () => {
    expect.soft(respArr1.length).toBeGreaterThanOrEqual(2);
    expect.soft(respArr2.length).toBeGreaterThanOrEqual(2);
    expect.soft(respArr3.length).toBeGreaterThanOrEqual(2);
    expect.soft(respArr4.length).toBeGreaterThanOrEqual(2);
  });
}
