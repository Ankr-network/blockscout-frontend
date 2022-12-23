import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env } from '../../../common';
import { XDC_SCALE_FACTOR } from '../../const';
import { getAnkrXDCRatio } from '../getAnkrXDCRatio';

describe('modules/xdc/sdk/getAnkrXDCRatio', () => {
  const ONE = new BigNumber(1);

  const provider = {
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              ratio: () => ({
                call: async () => `${XDC_SCALE_FACTOR}`,
              }),
            };
          }
        },
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return data for "getAnkrXDCRatio"', async () => {
    const data = await Promise.all([
      getAnkrXDCRatio({
        provider,
      }),
      getAnkrXDCRatio({
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ONE, ONE]);
  });
});
