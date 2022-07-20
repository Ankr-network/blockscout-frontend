import BigNumber from 'bignumber.js';

import { ONE, ZERO } from 'modules/common/const';
import { IStakeMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { getUSDAmount } from '../getUSDAmount';

describe('modules/dashboard/utils/getUSDAmount', () => {
  const AMOUNT = new BigNumber(1.03);
  const CERTIFICATE_RATIO = new BigNumber(0.99000786);
  const INFINITY_VAL = new BigNumber(Infinity);

  const METRICS = {
    [EMetricsServiceName.ETH]: {
      apy: new BigNumber(0.91),
      stakers: '10',
      totalStaked: new BigNumber(10),
      totalStakedUsd: new BigNumber(78),
    } as IStakeMetrics,
  };

  describe('Test Cases', () => {
    it('Case 1: Exception cases', () => {
      const usdAmounts = [
        getUSDAmount({
          amount: ZERO,
          ratio: ZERO,
          totalStaked: ZERO,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: ONE,
          ratio: ZERO,
          totalStaked: ZERO,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: ZERO,
          ratio: ZERO,
          totalStaked: ONE,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: ZERO,
          ratio: ZERO,
          totalStaked: ZERO,
          totalStakedUsd: ONE,
        }),
        getUSDAmount({
          amount: ZERO,
          ratio: ONE,
          totalStaked: ZERO,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: ONE,
          ratio: ZERO,
          totalStaked: ONE,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: ZERO,
          ratio: ZERO,
          totalStaked: ONE,
          totalStakedUsd: ONE,
        }),
        getUSDAmount({
          amount: ZERO,
          ratio: ONE,
          totalStaked: ZERO,
          totalStakedUsd: ONE,
        }),
        getUSDAmount({
          amount: ONE,
          ratio: ONE,
          totalStaked: ZERO,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: ONE,
          ratio: ZERO,
          totalStaked: ZERO,
          totalStakedUsd: ONE,
        }),
        getUSDAmount({
          amount: ZERO,
          ratio: ONE,
          totalStaked: ONE,
          totalStakedUsd: ZERO,
        }),
        getUSDAmount({
          amount: new BigNumber(-90.9),
          ratio: ONE,
          totalStaked: new BigNumber(-8.9),
          totalStakedUsd: new BigNumber(-10.8),
        }),
        getUSDAmount({
          amount: INFINITY_VAL,
          ratio: INFINITY_VAL,
          totalStaked: INFINITY_VAL,
          totalStakedUsd: INFINITY_VAL,
        }),
      ];

      expect(usdAmounts).toStrictEqual([
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]);
    });

    it('Case 2: "Undefined" cases', () => {
      const usdAmounts = [
        getUSDAmount({
          amount: AMOUNT,
        }),
        getUSDAmount({
          amount: AMOUNT,
          totalStaked: ONE,
        }),
        getUSDAmount({
          amount: AMOUNT,
          totalStakedUsd: ONE,
        }),
      ];

      expect(usdAmounts).toStrictEqual([undefined, undefined, undefined]);
    });

    it('Case 3: Valid result for the "Bond" token', () => {
      const { totalStaked, totalStakedUsd } = METRICS.eth;

      const usdAmount = getUSDAmount({
        amount: AMOUNT,
        totalStaked,
        totalStakedUsd,
      });

      expect(usdAmount?.toString(10)).toBe('8.034');
    });

    it('Case 4: Valid result for the "Certificate" token', () => {
      const { totalStaked, totalStakedUsd } = METRICS.eth;

      const usdAmount = getUSDAmount({
        amount: AMOUNT,
        ratio: CERTIFICATE_RATIO,
        totalStaked,
        totalStakedUsd,
      });

      expect(usdAmount?.toString(10)).toBe('8.11508708627828469968');
    });
  });
});
