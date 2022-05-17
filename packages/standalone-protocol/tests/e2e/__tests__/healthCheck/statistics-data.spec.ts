import numeral from 'numeral';

import { expect, test } from '@playwright/test';

import { LEGACY_STANDALONES, NON_LEGACY_STANDALONES, SECONDS_IN_A_DAY } from '../../constants';
import { capitalizeFirstLetter, getFloatFromString } from '../../helpers/common';
import { round } from '../../helpers/format/number';

test.describe('statistics data', async () => {
  for (const NON_LEGACY_STANDALONE of NON_LEGACY_STANDALONES) {
    test(`non legacy standalone: ${NON_LEGACY_STANDALONE.endPoint}`, async ({ page }) => {
      const respArr = [];
      page.on('response', async response => {
        if (response.url().includes(`/api/v1/stats/${NON_LEGACY_STANDALONE.network}/24h`)) {
          const resp = await response.json();
          respArr.push(resp);
        }
      });

      await page.goto(NON_LEGACY_STANDALONE.endPoint);
      await page.waitForLoadState('networkidle');

      const copyButtonLocator = page.locator(`data-test-id="copy-button"`);

      await test.step('verify ui', async () => {
        await expect(page).toHaveTitle(
          `Your Instant RPC Gateway to ${capitalizeFirstLetter(NON_LEGACY_STANDALONE.network)}`,
        );

        await expect(page.locator('[data-test-id="copy-button"]')).toBeVisible();
        await expect(page.locator('[data-test-id="info"]')).toBeVisible();
        await expect(page.locator('[data-test-id="chain-details"]')).toBeVisible();
        await expect(page.locator('[data-test-id="chart-details"]')).toBeVisible();
        await expect(page.locator('[data-test-id="node-in-operation"]')).toBeVisible();

        const buttonsCount = await copyButtonLocator.locator('button').count();
        for (let i = 0; i < buttonsCount; i++) {
          await expect.soft(copyButtonLocator.locator('button').nth(i)).toBeVisible();
          await expect.soft(copyButtonLocator.locator('button').nth(i)).toBeEnabled();
        }

        const anchors = page.locator('//a');
        const anchorsCount = await anchors.count();
        for (let i = 0; i < anchorsCount; i++) {
          await expect.soft(anchors.nth(i)).toBeVisible();
        }
      });

      await test.step('verify api request', async () => {
        expect(respArr.length).toBe(1);

        const apiTotalRequests = respArr[0].totalRequests;
        const apiCachedRequests = round((respArr[0].totalCached / apiTotalRequests) * 100, 2);
        const apiAvgRequests = round(apiTotalRequests / SECONDS_IN_A_DAY, 5);

        const requestsStatWidget = page.locator('[data-test-id="chain-details"]').locator('h2');
        const uiStatValues = await Promise.all(await requestsStatWidget.allTextContents());

        expect.soft(getFloatFromString(uiStatValues[0])).toBe(apiTotalRequests);
        expect.soft(getFloatFromString(uiStatValues[1])).toBe(apiCachedRequests);
        expect.soft(getFloatFromString(uiStatValues[2])).toBe(apiAvgRequests);
      });
    });
  }

  for (const LEGACY_STANDALONE of LEGACY_STANDALONES) {
    test.skip(`legacy standalone: ${LEGACY_STANDALONE.endPoint}`, async ({ page }) => {
      const respArr = [];
      page.on('response', async response => {
        if (response.url().includes('/api/data/stats')) {
          const resp = await response.json();
          respArr.push(resp);
        }
      });

      await page.goto(LEGACY_STANDALONE.endPoint);
      await page.waitForLoadState('networkidle');

      const headerLocator = page.locator(`header`);
      const widgetLocator = page.locator(`section`);

      await test.step('verify ui', async () => {
        await expect(page).toHaveTitle(/Your Instant RPC Gateway to/);

        const widgetsCount = await widgetLocator.count();
        for (let i = 0; i < widgetsCount; i++) {
          await expect.soft(widgetLocator.nth(i)).toBeVisible();
        }
        const buttonsCount = await headerLocator.locator('button').count();
        for (let i = 0; i < buttonsCount; i++) {
          await expect.soft(headerLocator.locator('button').nth(i)).toBeVisible();
          await expect.soft(headerLocator.locator('button').nth(i)).toBeEnabled();
        }

        const anchors = page.locator('//a');
        const anchorsCount = await anchors.count();
        for (let i = 0; i < anchorsCount; i++) {
          await expect.soft(anchors.nth(i)).toBeVisible();
        }
      });

      await test.step('verify api request', async () => {
        expect(respArr.length).toBe(1);

        const apiTotalRequests = respArr[0].totals.requests;
        const apiCachedRequests = round((respArr[0].totals.cachedRequests / apiTotalRequests) * 100, 2);
        const apiAvgRequests = round(apiTotalRequests / SECONDS_IN_A_DAY, 0);
        const apiBandwidth = respArr[0].totals.bytes;

        const requestsStatWidget = widgetLocator.nth(0).locator('div.value');
        const uiStatValues = await Promise.all(await requestsStatWidget.allTextContents());

        expect.soft(uiStatValues[0]).toBe(numeral(apiTotalRequests).format('0.00a'));
        expect.soft(getFloatFromString(uiStatValues[1])).toBe(apiCachedRequests);
        expect.soft(getFloatFromString(uiStatValues[2])).toBe(apiAvgRequests);
        expect.soft(uiStatValues[3]).toBe(numeral(apiBandwidth).format('0.00 b'));
      });
    });
  }
});
