import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Env, ETH_SCALE_FACTOR, ZERO } from '../../../common';
import { getStakeGasFee } from '../getStakeGasFee';

describe('modules/ethereum-ssv/sdk/getStakeGasFee', () => {
  const ONE = new BigNumber(1);

  const provider = {
    getContractMethodFee: async (data: number) => new BigNumber(data * 2),
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              getMinStake: () => ({
                call: async () => `${ETH_SCALE_FACTOR}`,
              }),
              stakeCerts: () => ({
                estimateGas: async () => 4_234_567,
              }),
            };
          }
        },
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

  const address = 'testAddr';

  test('should return "0"', async () => {
    const data = await Promise.all([
      getStakeGasFee({
        address,
        amount: new BigNumber(-1),
        provider,
      }),
      getStakeGasFee({
        address,
        amount: ZERO,
        provider,
      }),
      getStakeGasFee({
        address,
        amount: new BigNumber(0.5),
        env: Env.Develop,
        provider,
      }),
    ]);

    expect(data).toStrictEqual([ZERO, ZERO, ZERO]);
  });

  test('should return a valid data', async () => {
    const result = new BigNumber(8_469_134);

    const data = await Promise.all([
      getStakeGasFee({
        address,
        amount: ONE,
        provider,
      }),
      getStakeGasFee({
        address,
        amount: ONE,
        env: Env.Develop,
        provider,
        scale: 10 ** 12,
      }),
    ]);

    expect(data).toStrictEqual([result, result]);
  });
});
