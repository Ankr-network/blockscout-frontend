import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { ETH_SCALE_FACTOR, ZERO } from '../const';
import { getWeb3ReadableAmountFromWei } from '../utils';

describe('modules/common/utils', () => {
  const NEGATIVE_ONE = new BigNumber(-1);
  const ONE = new BigNumber(1);

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
