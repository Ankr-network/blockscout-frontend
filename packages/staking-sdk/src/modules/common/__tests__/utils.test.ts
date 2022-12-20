import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { ETH_SCALE_FACTOR, ZERO } from '../const';
import {
  getWeb3LatestBlockNumber,
  getWeb3PastEventsFromBlockchainByRange,
  getWeb3ReadableAmountFromWei,
} from '../utils';

describe('modules/common/utils', () => {
  const NEGATIVE_ONE = new BigNumber(-1);
  const ONE = new BigNumber(1);

  test('should return data for "getWeb3LatestBlockNumber"', async () => {
    const value = 1;

    const provider = {
      getWeb3: () => ({
        eth: {
          getBlockNumber: async () => value,
        },
      }),
    } as unknown as Web3KeyReadProvider;

    const data = await getWeb3LatestBlockNumber({ provider });

    expect(data).toBe(value);
  });

  test('should return data for "getWeb3PastEventsFromBlockchainByRange"', async () => {
    const contract = {
      getPastEvents: async () => [],
    } as unknown as Contract;

    const provider = {} as unknown as Web3KeyReadProvider;

    const data = await getWeb3PastEventsFromBlockchainByRange({
      contract,
      eventName: 'test',
      filter: {},
      latestBlockNumber: 2,
      provider,
      rangeStep: 1,
      startBlock: 1,
    });

    expect(data).toStrictEqual([]);
  });

  test('should return data for "getWeb3ReadableAmountFromWei"', () => {
    const provider = {
      getWeb3: () => web3,
    } as unknown as Web3KeyReadProvider;

    const data = [
      getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
        amount: `-${ETH_SCALE_FACTOR}`,
        provider,
      }),
      getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
        amount: '0',
        provider,
      }),
      getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
        amount: `${ETH_SCALE_FACTOR}`,
        provider,
      }),
    ];

    expect(data).toStrictEqual([NEGATIVE_ONE, ZERO, ONE]);
  });
});
