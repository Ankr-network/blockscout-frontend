import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env } from '../../../common';
import { XDC_SCALE_FACTOR } from '../../const';
import { getXDCPoolAmount } from '../getXDCPoolAmount';

describe('modules/xdc/sdk/getXDCPoolAmount', () => {
  const ONE = new BigNumber(1);

  const provider = {
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              getFreeBalance: () => ({
                call: async () => `${XDC_SCALE_FACTOR}`,
              }),
            };
          }
        },
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return data for "getXDCPoolAmount"', async () => {
    const data = await Promise.all([
      getXDCPoolAmount({
        provider,
      }),
      getXDCPoolAmount({
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ONE, ONE]);
  });
});
