import BigNumber from 'bignumber.js';

import { ONE, ZERO } from 'modules/common/const';
import { IStakeMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { getUSDAmount } from '../getUSDAmount';

describe('modules/dashboard/utils/getUSDAmount', () => {
  const AMOUNT = new BigNumber(1.03);
  const CERTIFICATE_RATIO = new BigNumber(0.99000786);

  const METRICS = {
    [EMetricsServiceName.ETH]: {
      apy: new BigNumber(0.91),
      stakers: '10',
      totalStaked: new BigNumber(10),
      totalStakedUsd: new BigNumber(78),
    } as IStakeMetrics,
  };

  describe('Test Cases', () => {
    it('Case 1: "Undefined" cases', () => {
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

    it('Case 2: "Zero" result', () => {
      const usdAmounts = [
        getUSDAmount({
          amount: ZERO,
          totalStaked: ONE,
          totalStakedUsd: ONE,
        }),
        getUSDAmount({
          amount: AMOUNT,
          totalStaked: ONE,
          totalStakedUsd: ONE,
          ratio: ZERO,
        }),
      ];

      expect(usdAmounts).toStrictEqual([undefined, undefined]);
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
        totalStaked,
        totalStakedUsd,
        ratio: CERTIFICATE_RATIO,
      });

      expect(usdAmount?.toString(10)).toBe('7.95372314724');
    });
  });
});
