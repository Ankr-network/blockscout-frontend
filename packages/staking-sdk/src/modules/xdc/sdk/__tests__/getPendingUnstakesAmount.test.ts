import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env } from '../../../common';
import { XDC_SCALE_FACTOR } from '../../const';
import { getPendingUnstakesAmount } from '../getPendingUnstakesAmount';

describe('modules/xdc/sdk/getPendingUnstakesAmount', () => {
  const ONE = new BigNumber(1);

  const address = 'testAddr';

  const provider = {
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              getPendingUnstakesOf: () => ({
                call: async () => `${XDC_SCALE_FACTOR}`,
              }),
            };
          }
        },
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return data for "getPendingUnstakesAmount"', async () => {
    const data = await Promise.all([
      getPendingUnstakesAmount({
        address,
        provider,
      }),
      getPendingUnstakesAmount({
        address,
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ONE, ONE]);
  });
});
