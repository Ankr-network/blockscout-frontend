import { expect, test } from '@playwright/test';

import { LEGACY_STANDALONES } from '../../constants';

const fixtureFailovers = [
  {
    createdAt: new Date().toISOString(),
    method: 'eth_getBalance',
    failedNode: 'Blockchain Foundation #1',
    successNode: 'Blockchain Foundation #1',
  },
  {
    createdAt: new Date().toISOString(),
    method: 'eth_getCall',
    failedNode: 'Blockchain Foundation #2',
    successNode: 'Blockchain Foundation #2',
  },
  {
    createdAt: new Date().toISOString(),
    method: 'eth_getLogs',
    failedNode: 'Blockchain Foundation #3',
    successNode: 'Blockchain Foundation #3',
  },
  {
    createdAt: new Date().toISOString(),
    method: 'eth_getDummy',
    failedNode: 'Blockchain Foundation #4',
    successNode: 'Blockchain Foundation #4',
  },
  {
    createdAt: new Date().toISOString(),
    method: 'eth_getDollars',
    failedNode: 'Blockchain Foundation #5',
    successNode: 'Blockchain Foundation #5',
  },
];

const fixtureMethodsValues = ['eth_getBalance', 'eth_getCall', 'eth_getLogs', 'eth_getDummy', 'eth_getDollars'];

test.describe('recovered requests list', async () => {
  for (const LEGACY_STANDALONE of LEGACY_STANDALONES) {
    test(`checking recently recovered requests: ${LEGACY_STANDALONE.endPoint}`, async ({ page }) => {
      await page.route(`**/api/data/failovers`, route => {
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(fixtureFailovers),
        });
      });

      await page.goto(LEGACY_STANDALONE.endPoint);
      await page.waitForLoadState('networkidle');

      const table = page.locator('[data-testid="table"]').nth(1);

      await test.step('recovered requests table should be sorted as api response', async () => {
        const ethMethods = await table.locator('tbody tr td:nth-child(2) span').allTextContents();
        expect.soft(ethMethods).toStrictEqual(fixtureMethodsValues);
        expect.soft(ethMethods.length).toEqual(fixtureMethodsValues.length);
      });
    });

    test(`checking api calls: ${LEGACY_STANDALONE.endPoint}`, async ({ page }) => {
      const respArr = [];

      page.on('response', async response => {
        if (response.url().includes(`/api/data/failovers`)) {
          const resp = await response.json();
          respArr.push(resp);
        }
      });

      await page.goto(LEGACY_STANDALONE.endPoint);
      await page.waitForLoadState('networkidle');

      expect(respArr.length).toBe(1);
      expect(respArr[0].length).toBeGreaterThan(0);
    });
  }
});
