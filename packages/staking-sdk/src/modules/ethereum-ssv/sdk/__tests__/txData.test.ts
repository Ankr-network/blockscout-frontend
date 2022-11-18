import { Web3KeyReadProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { Transaction, TransactionReceipt } from 'web3-core';

import { ETH_SCALE_FACTOR } from '../../../common';
import { IFetchTxData } from '../../../switcher';
import { getTxData, getTxReceipt } from '../txData';

describe('modules/ethereum-ssv/sdk/txData', () => {
  const ONE = new BigNumber(1);

  const txAddr = 'testAddr';
  const txDataVal = `${ETH_SCALE_FACTOR}`;
  const txHash = 'testHash';

  describe('should return data for "getTxData"', () => {
    test('should return data from "decodeParameters"', async () => {
      const provider = {
        getWeb3: () => ({
          eth: {
            abi: {
              decodeParameters: () => ({
                1: txDataVal,
              }),
            },
            getTransaction: async () =>
              ({
                from: txAddr,
                input: '',
                transactionIndex: 1,
                value: '0',
              } as Transaction),
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await getTxData({
        provider,
        txHash,
      });

      expect(data).toStrictEqual({
        amount: ONE,
        destinationAddress: txAddr,
        isPending: false,
      } as IFetchTxData);
    });

    test('should return data from "tx.value"', async () => {
      const provider = {
        getWeb3: () => ({
          eth: {
            getTransaction: async () =>
              ({
                from: txAddr,
                transactionIndex: null,
                value: txDataVal,
              } as Transaction),
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await getTxData({
        provider,
        txHash,
      });

      expect(data).toStrictEqual({
        amount: ONE,
        destinationAddress: txAddr,
        isPending: true,
      } as IFetchTxData);
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
