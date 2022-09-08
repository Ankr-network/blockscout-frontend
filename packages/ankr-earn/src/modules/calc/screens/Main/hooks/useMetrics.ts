import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { TCalcToken } from 'modules/calc/types';
import { ZERO } from 'modules/common/const';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { SUPPORTED_TOKENS } from '../../../const';

type TCalcMetrics = Record<
  TCalcToken,
  { apy: BigNumber; usdTokenPrice: BigNumber }
>;

interface ICalcMetrics extends TCalcMetrics {
  isLoading: boolean;
}

export const useMetrics = (): ICalcMetrics => {
  const { data: metricsData, loading: isLoading } = useQuery({
    type: getMetrics,
  });

  const metrics = useMemo(
    () =>
      SUPPORTED_TOKENS.reduce((acc, token) => {
        const tokenMetrics = (metricsData ?? {})[
          token.toLowerCase() as EMetricsServiceName
        ];

        if (tokenMetrics) {
          const { apy, totalStaked, totalStakedUsd } = tokenMetrics;
          const usdTokenPrice = totalStakedUsd.dividedBy(totalStaked);

          acc[token] = {
            apy,
            usdTokenPrice,
          };
        } else {
          acc[token] = {
            apy: ZERO,
            usdTokenPrice: ZERO,
          };
        }

        return acc;
      }, {} as TCalcMetrics),
    [metricsData],
  );

  return {
    ...metrics,
    isLoading,
  };
};
