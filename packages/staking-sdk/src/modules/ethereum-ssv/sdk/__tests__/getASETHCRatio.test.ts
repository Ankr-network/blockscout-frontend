import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Env, ETH_SCALE_FACTOR } from '../../../common';
import { getASETHCRatio } from '../getASETHCRatio';

describe('modules/ethereum-ssv/sdk/getASETHCRatio', () => {
  const ONE = new BigNumber(1);

  const provider = {
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              ratio: () => ({
                call: async () => `${ETH_SCALE_FACTOR}`,
              }),
            };
          }
        },
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return data for "getASETHCRatio"', async () => {
    const data = await Promise.all([
      getASETHCRatio({
        provider,
      }),
      getASETHCRatio({
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ONE, ONE]);
  });
});
