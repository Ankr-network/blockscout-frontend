import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { Log, TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { configFromEnv, currentEnv, Env, ZERO } from '../../../common';
import { IFetchTxData } from '../../../switcher';
import { XDC_SCALE_FACTOR } from '../../const';
import { getTxData, getTxReceipt } from '../txData';

describe('modules/xdc/sdk/txData', () => {
  const ONE = new BigNumber(1);

  const txAddr = '0x3456789012345678901234567890123456789012';
  const txDataVal = `${XDC_SCALE_FACTOR}`;
  const txHash = 'testHash';

  describe('should return data for "getTxData"', () => {
    test('should return data for empty "tx.logs"', async () => {
      const provider = {
        getWeb3: () => ({
          eth: {
            getTransactionReceipt: async () =>
              ({
                from: 'testAddr',
                logs: [],
                transactionIndex: null,
              } as unknown as TransactionReceipt),
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await getTxData({
        provider,
        txHash,
      });

      expect(data).toStrictEqual({
        amount: ZERO,
        destinationAddress: undefined,
        isPending: true,
      } as IFetchTxData);
    });

    test('should return data for valid "tx.logs"', async () => {
      const { xdcConfig } = configFromEnv(currentEnv);

      const result = {
        amount: ONE,
        destinationAddress: 'xdc3456789012345678901234567890123456789012',
        isPending: true,
      } as IFetchTxData;

      const provider = {
        getWeb3: () => ({
          eth: {
            getTransactionReceipt: async () =>
              ({
                from: txAddr,
                logs: [
                  {
                    address: xdcConfig.XDCStakingPool,
                    data: txDataVal,
                  },
                  {
                    address: xdcConfig.ankrXDCToken,
                    data: txDataVal,
                  },
                ] as Log[],
                transactionIndex: null,
              } as unknown as TransactionReceipt),
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await Promise.all([
        getTxData({
          env: Env.Develop,
          provider,
          txHash,
        }),
        getTxData({
          isUnstake: true,
          provider,
          txHash,
        }),
      ]);

      expect(data).toStrictEqual([result, result] as IFetchTxData[]);
    });
  });

  test('should return data for "getTxReceipt"', async () => {
    const provider = {
      getWeb3: () => ({
        eth: {
          getTransactionReceipt: async (hash: string) =>
            ({
              transactionHash: hash,
            } as TransactionReceipt),
        },
      }),
    } as unknown as Web3KeyReadProvider;

    const data = await getTxReceipt({
      provider,
      txHash,
    });

    expect(data).toStrictEqual({
      transactionHash: txHash,
    } as TransactionReceipt);
  });
});
