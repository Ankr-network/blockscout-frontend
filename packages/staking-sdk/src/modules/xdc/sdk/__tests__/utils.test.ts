import BigNumber from 'bignumber.js';

import { ZERO } from '../../../common';
import { getValidXDCAddress, isValidStakeAmount } from '../utils';

describe('modules/xdc/sdk/utils', () => {
  const MIN_STAKE_AMOUNT = new BigNumber(0.5);
  const NEGATIVE_ONE = new BigNumber(-1);
  const ONE = new BigNumber(1);

  describe('should return data for "getValidXDCAddress"', () => {
    test('should return "undefined"', () => {
      const data = [
        getValidXDCAddress(),
        getValidXDCAddress(''),
        getValidXDCAddress('12345678901234567890123456789012345678901'),
      ];

      expect(data).toStrictEqual([undefined, undefined, undefined]);
    });

    test('should return "string"', () => {
      const data = [
        getValidXDCAddress('0x3456789012345678901234567890123456789012'),
        getValidXDCAddress('xdc345678901234567890123456789012345678901'),
      ];

      expect(data).toStrictEqual([
        'xdc3456789012345678901234567890123456789012',
        'xdc345678901234567890123456789012345678901',
      ]);
    });
  });

  describe('should return data for "isValidStakeAmount"', () => {
    test('should return "false"', () => {
      const data = [
        isValidStakeAmount({
          amount: NEGATIVE_ONE,
          minStakeAmount: NEGATIVE_ONE,
        }),
        isValidStakeAmount({
          amount: ZERO,
          minStakeAmount: NEGATIVE_ONE,
        }),
        isValidStakeAmount({
          amount: NEGATIVE_ONE,
          minStakeAmount: ZERO,
        }),
        isValidStakeAmount({
          amount: ZERO,
          minStakeAmount: ZERO,
        }),
        isValidStakeAmount({
          amount: ZERO,
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
        isValidStakeAmount({
          amount: new BigNumber(1.7),
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
      ];

      expect(data).toStrictEqual([false, false, false, false, false, false]);
    });

    test('should return "true"', () => {
      const data = [
        isValidStakeAmount({
          amount: MIN_STAKE_AMOUNT,
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
        isValidStakeAmount({
          amount: ONE,
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
        isValidStakeAmount({
          amount: new BigNumber(1.5),
          minStakeAmount: MIN_STAKE_AMOUNT,
        }),
      ];

      expect(data).toStrictEqual([true, true, true]);
    });
  });
});
