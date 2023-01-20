import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env } from '../../../common';
import { XDC_SCALE_FACTOR } from '../../const';
import { getAnkrXDCBalance, getXDCBalance } from '../balances';

describe('modules/xdc/sdk/balances', () => {
  const ONE = new BigNumber(1);

  const address = 'testAddr';
  const balance = `${XDC_SCALE_FACTOR}`;

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

  test('should return balance from "getAnkrXDCBalance"', async () => {
    const data = await Promise.all([
      getAnkrXDCBalance({
        address,
        provider,
      }),
      getAnkrXDCBalance({
        address,
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ONE, ONE]);
  });

  test('should return balance from "getXDCBalance"', async () => {
    const data = await getXDCBalance({
      address,
      provider,
    });

    expect(data.toString(10)).toBe(ONE.toString(10));
  });
});
