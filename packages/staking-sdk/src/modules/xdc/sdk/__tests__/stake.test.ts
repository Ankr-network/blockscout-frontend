import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env, ESDKErrorCodes, ZERO } from '../../../common';
import { IStakeData } from '../../../stake';
import { XDC_SCALE_FACTOR } from '../../const';
import { stake } from '../stake';

describe('modules/xdc/sdk/stake', () => {
  const address = 'testAddr';
  const txHash = 'testHash';

  test('should return "ESDKErrorCodes.INVALID_AMOUNT" error', async () => {
    const provider = {
      getWeb3: () => ({
        eth: {
          Contract: class {
            methods;

            constructor() {
              this.methods = {
                getMinStake: () => ({
                  call: async () => `${XDC_SCALE_FACTOR}`,
                }),
              };
            }
          },
        },
        utils: web3.utils,
      }),
    } as unknown as Web3KeyReadProvider;

    expect(
      stake({
        address,
        amount: new BigNumber(-1),
        provider,
      }),
    ).rejects.toThrowError(ESDKErrorCodes.INVALID_AMOUNT);

    expect(
      stake({
        address,
        amount: ZERO,
        provider,
      }),
    ).rejects.toThrowError(ESDKErrorCodes.INVALID_AMOUNT);

    expect(
      stake({
        address,
        amount: new BigNumber(0.5),
        env: Env.Develop,
        provider,
      }),
    ).rejects.toThrowError(ESDKErrorCodes.INVALID_AMOUNT);
  });

  test('should return a valid data', async () => {
    const result = {
      txHash,
    } as IStakeData;

    const provider = {
      getWeb3: () => ({
        eth: {
          Contract: class {
            methods;

            constructor() {
              this.methods = {
                getMinStake: () => ({
                  call: async () => `${10 * XDC_SCALE_FACTOR}`,
                }),
                stakeCerts: () => ({
                  send: async () =>
                    ({
                      transactionHash: txHash,
                    } as TransactionReceipt),
                }),
              };
            }
          },
        },
        utils: web3.utils,
      }),
    } as unknown as Web3KeyReadProvider;

    const data = await Promise.all([
      stake({
        address,
        amount: new BigNumber(10),
        provider,
      }),
      stake({
        address,
        amount: new BigNumber(20),
        env: Env.Develop,
        provider,
        scale: 10 ** 12,
      }),
    ]);

    expect(data).toStrictEqual([result, result] as IStakeData[]);
  });
});
