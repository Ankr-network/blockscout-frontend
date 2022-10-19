import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Env, ETH_SCALE_FACTOR } from '../../../common';
import { getASETHCBalance, getETHBalance } from '../balances';

describe('modules/ethereum-ssv/sdk/balances', () => {
  const ONE = new BigNumber(1);

  const address = 'testAddr';
  const balance = `${ETH_SCALE_FACTOR}`;

  const provider = {
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              balanceOf: () => ({
                call: async () => balance,
              }),
            };
          }
        },
        getBalance: async () => balance,
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return balance from "getASETHCBalance"', async () => {
    const data = await Promise.all([
      getASETHCBalance({
        address,
        provider,
      }),
      getASETHCBalance({
        address,
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ONE, ONE]);
  });

  test('should return balance from "getETHBalance"', async () => {
    const data = await getETHBalance({
      address,
      provider,
    });

    expect(data.toString(10)).toBe(ONE.toString(10));
  });
});
