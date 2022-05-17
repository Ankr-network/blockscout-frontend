import { expect, test } from '@playwright/test';

import { NON_LEGACY_STANDALONES, NON_LEGACY_STANDALONES_THEMES } from '../../constants';

const fixtureNodes = [
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Chicago (red)',
    isArchive: false,
    organization: 'ankr.com',
    id: '006a3f0c-b4b7-4c8a-bfa4-1ac5f6b8943d',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Los Angeles',
    isArchive: false,
    organization: 'ankr.com',
    id: '0b9c8ba4-447e-4a81-b4bc-ee290f4013bb',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Chicago',
    isArchive: false,
    organization: 'ankr.com',
    id: '118452d4-0753-475f-b52a-c8a0569225f7',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'EU',
    country: 'FI',
    city: 'Helsinki (yellow)',
    isArchive: false,
    organization: 'ankr.com',
    id: '155414c8-d969-438d-8c37-448903bdea1d',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'EU',
    country: 'FI',
    city: 'Helsinki',
    isArchive: false,
    organization: 'ankr.com',
    id: '1a746399-2fa0-48ba-a54f-2068c4673ea0',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Dallas',
    isArchive: false,
    organization: 'ankr.com',
    id: '2aa2703c-40e0-4826-8e65-f036a7aeb288',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'EU',
    country: 'FI',
    city: 'Helsinki',
    isArchive: false,
    organization: 'ankr.com',
    id: '3bb574dc-1ac4-4fbc-8237-6937a274b56c',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'EU',
    country: 'NL',
    city: 'Amsterdam',
    isArchive: false,
    organization: 'ankr.com',
    id: '4d830520-2f0b-4488-9d74-165e092da331',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Phoenix',
    isArchive: false,
    organization: 'ankr.com',
    id: '4fedd3ed-d4a6-4f40-82b2-c200c207e672',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Phoenix',
    isArchive: false,
    organization: 'ankr.com',
    id: '5441e02c-44ff-4a3d-a149-810419b5cbcd',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Dallas',
    isArchive: false,
    organization: 'ankr.com',
    id: '5b590723-19fc-4a04-a6b9-2b0715213218',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Los Angeles',
    isArchive: false,
    organization: 'com.ankr',
    id: '63e61777-aac6-434d-829a-9d564c32e4fc',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Chicago',
    isArchive: false,
    organization: 'ankr.com',
    id: '6e12d314-19cb-45dd-9251-129dca36f369',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'EU',
    country: 'FI',
    city: 'Helsinki',
    isArchive: false,
    organization: 'ankr.com',
    id: '94c5fa47-1423-4be9-9188-b71b49c880a9',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Dallas',
    isArchive: false,
    organization: 'ankr.com',
    id: 'adf9e563-9540-4cbb-8a42-3cbc67fbd583',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Los Angeles',
    isArchive: false,
    organization: 'ankr.com',
    id: 'e5b03084-bad2-4595-bdb0-617b56b3621d',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Los Angeles',
    isArchive: false,
    organization: 'ankr.com',
    id: 'f1f9e6b2-c0d5-4948-b713-b5666775713c',
  },
  {
    blockchain: 'arbitrum',
    scheme: 'web3',
    continent: 'NA',
    country: 'US',
    city: 'Ashburn',
    isArchive: false,
    organization: 'ankr.com',
    id: 'fe7d9028-f283-4b54-b72a-e88f96c67005',
  },
];

const fixtureWeights = [
  {
    id: '006a3f0c-b4b7-4c8a-bfa4-1ac5f6b8943d',
    weight: 0,
    latency: 0,
    timestamp: 1646323460945,
    height: 7365444,
    height_timestamp: 1646324221075,
    score: 0,
  },
  {
    id: '0b9c8ba4-447e-4a81-b4bc-ee290f4013bb',
    weight: 21,
    latency: 890,
    timestamp: 1646323932498,
    height: 7365444,
    height_timestamp: 1646324221082,
    score: 10,
  },
  {
    id: '118452d4-0753-475f-b52a-c8a0569225f7',
    weight: 35,
    latency: 221,
    timestamp: 1646323693257,
    height: 7365444,
    height_timestamp: 1646324221083,
    score: 10,
  },
  {
    id: '155414c8-d969-438d-8c37-448903bdea1d',
    weight: 10,
    latency: 483,
    timestamp: 1646323573939,
    height: 7365442,
    height_timestamp: 1646324221085,
    score: 4,
  },
  {
    id: '1a746399-2fa0-48ba-a54f-2068c4673ea0',
    weight: 0,
    latency: 101,
    timestamp: 1646323573557,
    height: 7365442,
    height_timestamp: 1646324221086,
    score: 5,
  },
  {
    id: '2aa2703c-40e0-4826-8e65-f036a7aeb288',
    weight: 0,
    latency: 598,
    timestamp: 1646323932206,
    height: 7365442,
    height_timestamp: 1646324221092,
    score: 5,
  },
  {
    id: '3bb574dc-1ac4-4fbc-8237-6937a274b56c',
    weight: 0,
    latency: 636,
    timestamp: 1646323574092,
    height: 7365442,
    height_timestamp: 1646324221101,
    score: 5,
  },
  {
    id: '4d830520-2f0b-4488-9d74-165e092da331',
    weight: 0,
    latency: 555,
    timestamp: 1646323693591,
    height: 7365442,
    height_timestamp: 1646324221103,
    score: 5,
  },
  {
    id: '4fedd3ed-d4a6-4f40-82b2-c200c207e672',
    weight: 25,
    latency: 654,
    timestamp: 1646323814303,
    height: 7365444,
    height_timestamp: 1646324221104,
    score: 10,
  },
  {
    id: '5441e02c-44ff-4a3d-a149-810419b5cbcd',
    weight: 32,
    latency: 272,
    timestamp: 1646323693308,
    height: 7365444,
    height_timestamp: 1646324221106,
    score: 10,
  },
  {
    id: '5b590723-19fc-4a04-a6b9-2b0715213218',
    weight: 0,
    latency: 603,
    timestamp: 1646323932211,
    height: 7365442,
    height_timestamp: 1646324221108,
    score: 5,
  },
  {
    id: '63e61777-aac6-434d-829a-9d564c32e4fc',
    weight: 21,
    latency: 1294,
    timestamp: 1646323814943,
    height: 7365445,
    height_timestamp: 1646324221144,
    score: 10,
  },
  {
    id: '6e12d314-19cb-45dd-9251-129dca36f369',
    weight: 1,
    latency: 1311,
    timestamp: 1646323814960,
    height: 7365445,
    height_timestamp: 1646324221147,
    score: 10,
  },
  {
    id: '94c5fa47-1423-4be9-9188-b71b49c880a9',
    weight: 111,
    latency: 102,
    timestamp: 1646323573558,
    height: 7365444,
    height_timestamp: 1646324221153,
    score: 10,
  },
  {
    id: 'adf9e563-9540-4cbb-8a42-3cbc67fbd583',
    weight: 26,
    latency: 591,
    timestamp: 1646323333590,
    height: 7365444,
    height_timestamp: 1646324221162,
    score: 10,
  },
  {
    id: 'e5b03084-bad2-4595-bdb0-617b56b3621d',
    weight: 26,
    latency: 211,
    timestamp: 1646323573667,
    height: 7365445,
    height_timestamp: 1646324221172,
    score: 10,
  },
  {
    id: 'f1f9e6b2-c0d5-4948-b713-b5666775713c',
    weight: 22,
    latency: 822,
    timestamp: 1646323454767,
    height: 7365445,
    height_timestamp: 1646324221174,
    score: 10,
  },
  {
    id: 'fe7d9028-f283-4b54-b72a-e88f96c67005',
    weight: 34,
    latency: 425,
    timestamp: 1646323333424,
    height: 7365445,
    height_timestamp: 1646324221178,
    score: 10,
  },
  {
    id: '0534083b-45b5-437b-afa2-903e424c912c',
    weight: 130,
    latency: 178,
    timestamp: 1646323931786,
    height: 15741185,
    height_timestamp: 1646324221078,
    score: 10,
  },
  {
    id: '0871df6e-055c-4bcd-b9ac-8d22dbe569d9',
    weight: 17,
    latency: 742,
    timestamp: 1646323693778,
    height: 14315041,
    height_timestamp: 1646324221079,
    score: 10,
  },
];

const fixtureWeightValues = [
  '9%',
  '7%',
  '6%',
  '6%',
  '0%',
  '30%',
  '10%',
  '9%',
  '7%',
  '7%',
  '6%',
  '0%',
  '3%',
  '0%',
  '0%',
  '0%',
  '0%',
  '0%',
];

test.describe('node list', async () => {
  for (const NON_LEGACY_STANDALONE of NON_LEGACY_STANDALONES) {
    test(`checking colors and sorting: ${NON_LEGACY_STANDALONE.endPoint}`, async ({ page }) => {
      for (let i = 0; i < fixtureNodes.length; i++) {
        fixtureNodes[i].blockchain = NON_LEGACY_STANDALONE.network;
      }

      await page.route(`**/api/v1/node?blockchain=${NON_LEGACY_STANDALONE.network}`, route => {
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(fixtureNodes),
        });
      });
      await page.route(`**/api/v1/weight`, route => {
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(fixtureWeights),
        });
      });

      await page.goto(NON_LEGACY_STANDALONE.endPoint);

      const table = page.locator('table tbody');
      const theme = NON_LEGACY_STANDALONES_THEMES[NON_LEGACY_STANDALONE.network].theme;

      await test.step('node with score 4 should have yellow label', async () => {
        const yellowCells = table.locator('tr', { hasText: 'Helsinki (yellow)' }).locator('td');
        await expect(yellowCells.nth(0).locator('div div')).toHaveCSS('background-color', theme.palette.warning.main);
        await expect(yellowCells.nth(1).locator('span')).toHaveCSS('color', theme.palette.warning.main);
      });

      await test.step('node with score 0 should have red label', async () => {
        const redCells = table.locator('tr', { hasText: 'Chicago (red)' }).locator('td');
        await expect(redCells.nth(0).locator('div div')).toHaveCSS('background-color', theme.palette.error.main);
        await expect(redCells.nth(1).locator('span')).toHaveCSS('color', theme.palette.error.main);
      });

      await test.step('weights should be sorted by desc', async () => {
        const weightValues = await table.locator('tr').locator('td:nth-child(4)').allTextContents();
        expect(weightValues).toStrictEqual(fixtureWeightValues);
        expect(weightValues.length).toEqual(fixtureWeightValues.length);
      });
    });

    test(`checking api calls: ${NON_LEGACY_STANDALONE.endPoint}`, async ({ page }) => {
      await page.goto(NON_LEGACY_STANDALONE.endPoint);
      await page.waitForResponse(
        response =>
          response.url().includes(`/api/v1/node?blockchain=${NON_LEGACY_STANDALONE.network}`) &&
          response.status() === 200,
      );
      await page.waitForResponse(response => response.url().includes(`/api/v1/weight`) && response.status() === 200);
    });
  }
});
