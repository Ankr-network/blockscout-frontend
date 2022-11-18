import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

import { Env, ESDKErrorCodes, ETH_SCALE_FACTOR, ZERO } from '../../../common';
import { IStakeData } from '../../../stake';
import { stake } from '../stake';

describe('modules/ethereum-ssv/sdk/stake', () => {
  const ONE = new BigNumber(1);

  const address = 'testAddr';
  const txHash = 'testHash';

  test('should return "ESDKErrorCodes.INVALID_AMOUNT" error', async () => {
    const provider = {
      getSafeGasPriceWei: async () => new BigNumber(123_456),
      getWeb3: () => ({
        eth: {
          Contract: class {
            methods;

            constructor() {
              this.methods = {
                getMinStake: () => ({
                  call: async () => `${ETH_SCALE_FACTOR}`,
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

  test('should return "ESDKErrorCodes.INSUFFICIENT_BALANCE" error', async () => {
    const getProvider = (balance: string) =>
      ({
        getContractMethodFee: async (data: number) => new BigNumber(data),
        getSafeGasPriceWei: async () => new BigNumber(3),
        getWeb3: () => ({
          eth: {
            Contract: class {
              methods;

              constructor() {
                this.methods = {
                  getMinStake: () => ({
                    call: async () => `${0.5 * ETH_SCALE_FACTOR}`,
                  }),
                  stakeCerts: () => ({
                    estimateGas: async () => 2,
                  }),
                };
              }
            },
            getBalance: async () => balance,
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider);

    expect(
      stake({
        address,
        amount: ONE,
        provider: getProvider('0'),
      }),
    ).rejects.toThrowError(ESDKErrorCodes.INSUFFICIENT_BALANCE);

    expect(
      stake({
        address,
        amount: ONE,
        provider: getProvider(`${1.5 * ETH_SCALE_FACTOR}`),
      }),
    ).rejects.toThrowError(ESDKErrorCodes.INSUFFICIENT_BALANCE);

    expect(
      stake({
        address,
        amount: ONE,
        env: Env.Develop,
        provider: getProvider(`${2 * ETH_SCALE_FACTOR}`),
        scale: 10 ** 12,
      }),
    ).rejects.toThrowError(ESDKErrorCodes.INSUFFICIENT_BALANCE);
  });

  test('should return a valid data', async () => {
    const result = {
      txHash,
    } as IStakeData;

    const getProvider = (balance: string) =>
      ({
        getContractMethodFee: async (data: number) => new BigNumber(data),
        getSafeGasPriceWei: async () => new BigNumber(1),
        getWeb3: () => ({
          eth: {
            Contract: class {
              methods;

              constructor() {
                this.methods = {
                  getMinStake: () => ({
                    call: async () => `${0.5 * ETH_SCALE_FACTOR}`,
                  }),
                  stakeCerts: () => ({
                    estimateGas: async () => 1,
                    send: async () =>
                      ({
                        transactionHash: txHash,
                      } as TransactionReceipt),
                  }),
                };
              }
            },
            getBalance: async () => balance,
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider);

    const data = await Promise.all([
      stake({
        address,
        amount: ONE,
        provider: getProvider(`${2 * ETH_SCALE_FACTOR}`),
      }),
      stake({
        address,
        amount: new BigNumber(10),
        provider: getProvider(`${5 * ETH_SCALE_FACTOR}`),
      }),
      stake({
        address,
        amount: new BigNumber(3),
        env: Env.Develop,
        provider: getProvider(`${4 * ETH_SCALE_FACTOR}`),
        scale: 10 ** 10,
      }),
    ]);

    expect(data).toStrictEqual([result, result, result]);
  });
});
