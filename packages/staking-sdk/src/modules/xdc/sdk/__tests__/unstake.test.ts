import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env, ESDKErrorCodes, ZERO } from '../../../common';
import { IStakeData } from '../../../stake';
import { unstake } from '../unstake';

describe('modules/xdc/sdk/unstake', () => {
  const address = 'testAddr';
  const txHash = 'testHash';

  test('should return "ESDKErrorCodes.ZERO_AMOUNT" error', async () => {
    const provider = {} as unknown as Web3KeyReadProvider;

    expect(
      unstake({
        address,
        amount: new BigNumber(-1),
        provider,
      }),
    ).rejects.toThrowError(ESDKErrorCodes.ZERO_AMOUNT);

    expect(
      unstake({
        address,
        amount: ZERO,
        provider,
      }),
    ).rejects.toThrowError(ESDKErrorCodes.ZERO_AMOUNT);
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
                unstakeCerts: () => ({
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
      unstake({
        address,
        amount: new BigNumber(0.1),
        provider,
      }),
      unstake({
        address,
        amount: new BigNumber(1.1),
        env: Env.Develop,
        provider,
        scale: 10 ** 12,
      }),
    ]);

    expect(data).toStrictEqual([result, result] as IStakeData[]);
  });
});
