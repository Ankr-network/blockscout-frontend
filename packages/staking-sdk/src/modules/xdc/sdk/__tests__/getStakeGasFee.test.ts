import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env, ZERO } from '../../../common';
import { XDC_SCALE_FACTOR } from '../../const';
import { getStakeGasFee } from '../getStakeGasFee';

describe('modules/xdc/sdk/getStakeGasFee', () => {
  const ONE = new BigNumber(1);

  const address = 'testAddr';

  const provider = {
    getContractMethodFee: async (data: number) => new BigNumber(data * 2),
    getWeb3: () => ({
      eth: {
        Contract: class {
          methods;

          constructor() {
            this.methods = {
              getMinStake: () => ({
                call: async () => `${XDC_SCALE_FACTOR}`,
              }),
              stakeCerts: () => ({
                estimateGas: async () => 1_234_567,
              }),
            };
          }
        },
      },
      utils: web3.utils,
    }),
  } as unknown as Web3KeyReadProvider;

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
    const result = new BigNumber(2_469_134);

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
