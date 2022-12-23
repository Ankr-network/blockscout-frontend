import BigNumber from 'bignumber.js';

import { ZERO } from '../../../common';
import { getXDCAddress, isValidAmount } from '../utils';

describe('modules/xdc/sdk/utils', () => {
  const MIN_STAKE_AMOUNT = new BigNumber(0.5);
  const NEGATIVE_ONE = new BigNumber(-1);
  const ONE = new BigNumber(1);

  describe('should return data for "getXDCAddress"', () => {
    test('should return "undefined"', () => {
      const data = [
        getXDCAddress(),
        getXDCAddress(''),
        getXDCAddress('12345678901234567890123456789012345678901'),
      ];

      expect(data).toStrictEqual([undefined, undefined, undefined]);
    });

    test('should return "string"', () => {
      const data = [
        getXDCAddress('0x3456789012345678901234567890123456789012'),
        getXDCAddress('xdc345678901234567890123456789012345678901'),
      ];

      expect(data).toStrictEqual([
        'xdc3456789012345678901234567890123456789012',
        'xdc345678901234567890123456789012345678901',
      ]);
    });
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
