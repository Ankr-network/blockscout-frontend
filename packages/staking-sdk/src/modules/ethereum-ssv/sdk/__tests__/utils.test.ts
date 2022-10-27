import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import web3 from 'web3';

import { ETH_SCALE_FACTOR, ZERO } from '../../../common';
import { getReadableAmountFromWei, isValidAmount } from '../utils';

describe('modules/ethereum-ssv/sdk/utils', () => {
  const MIN_STAKE_AMOUNT = new BigNumber(0.5);
  const NEGATIVE_ONE = new BigNumber(-1);
  const ONE = new BigNumber(1);

  test('should return data for "getReadableAmountFromWei"', () => {
    const provider = {
      getWeb3: () => web3,
    } as unknown as Web3KeyReadProvider;

    const data = [
      getReadableAmountFromWei({
        amount: `-${ETH_SCALE_FACTOR}`,
        provider,
      }),
      getReadableAmountFromWei({
        amount: '0',
        provider,
      }),
      getReadableAmountFromWei({
        amount: `${ETH_SCALE_FACTOR}`,
        provider,
      }),
    ];

    expect(data).toStrictEqual([NEGATIVE_ONE, ZERO, ONE]);
  });

  describe('should return data for "isValidAmount"', () => {
    test('should return "false"', () => {
      const data = [
        isValidAmount({
          amount: NEGATIVE_ONE,
          minStakeAmount: NEGATIVE_ONE,
        }),
        isValidAmount({
          amount: ZERO,
          minStakeAmount: NEGATIVE_ONE,
        }),
        isValidAmount({
          amount: NEGATIVE_ONE,
          minStakeAmount: ZERO,
        }),
        isValidAmount({
          amount: ZERO,
          minStakeAmount: ZERO,
        }),
        isValidAmount({
          amount: ZERO,
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
        isValidAmount({
          amount: new BigNumber(1.7),
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
      ];

      expect(data).toStrictEqual([false, false, false, false, false, false]);
    });

    test('should return "true"', () => {
      const data = [
        isValidAmount({
          amount: MIN_STAKE_AMOUNT,
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
        isValidAmount({
          amount: ONE,
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
        isValidAmount({
          amount: new BigNumber(1.5),
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
      ];

      expect(data).toStrictEqual([true, true, true]);
    });
  });
});
