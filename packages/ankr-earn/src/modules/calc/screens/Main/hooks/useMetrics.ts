import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';

import { SUPPORTED_TOKENS } from 'modules/calc/const';
import { TCalcToken } from 'modules/calc/types';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getMaxApy as getMaxAnkrApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getMaxApr as getMGNOMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

type TCalcMetrics = Record<
  TCalcToken,
  { apy: BigNumber; usdTokenPrice: BigNumber }
>;

interface ICalcMetrics {
  metrics: TCalcMetrics;
  isLoading: boolean;
}

export const useMetrics = (): ICalcMetrics => {
  const dispatchRequest = useDispatchRequest();
  const { data: metricsData, loading: isMetricsLoading } = useQuery({
    type: getMetrics,
  });

  const { data: ankrApyData, loading: isAnkrApyLoading } = useQuery({
    type: getMaxAnkrApy,
  });

  const { data: ankrPriceData, loading: isAnkrPriceLoading } = useQuery({
    type: getANKRPrice,
  });

  const { data: mGNOApyData, loading: isMGNOApyLoading } = useQuery({
    type: getMGNOMaxApr,
  });

  const { data: mGNOPriceData, loading: isMGNOPriceLoading } = useQuery({
    type: getMGNOPrice,
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
        } else if (token === Token.ANKR && ankrApyData && ankrPriceData) {
          acc[token] = {
            apy: ankrApyData,
            usdTokenPrice: ankrPriceData,
          };
        } else if (token === Token.mGNO && mGNOApyData && mGNOPriceData) {
          acc[token] = {
            apy: mGNOApyData,
            usdTokenPrice: mGNOPriceData,
          };
        } else {
          acc[token] = {
            apy: ZERO,
            usdTokenPrice: ZERO,
          };
        }

        return acc;
      }, {} as TCalcMetrics),
    [ankrApyData, ankrPriceData, mGNOApyData, mGNOPriceData, metricsData],
  );

  const isLoading =
    isMetricsLoading ||
    isAnkrApyLoading ||
    isAnkrPriceLoading ||
    isMGNOApyLoading ||
    isMGNOPriceLoading;

  useEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(getMaxAnkrApy());
    dispatchRequest(getANKRPrice());
    dispatchRequest(getMGNOMaxApr());
    dispatchRequest(getMGNOPrice());
  }, [dispatchRequest]);

  return {
    metrics,
    isLoading,
  };
};
