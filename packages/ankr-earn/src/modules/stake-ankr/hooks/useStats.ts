import { t } from '@ankr.com/common';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { useGetProvidersTotalInfoQuery } from 'modules/stake-ankr/actions/getProvidersTotalInfo';
import { getMetrics } from 'modules/stake/actions/getMetrics';

import { useGetAnkrPriceQuery } from '../actions/getANKRPrice';
import { CACHE_SECONDS } from '../screens/Providers/const';

interface IStatsProps {
  amount: BigNumberish;
}

interface IUseStats {
  apyText: string;
  annualEarning: string;
  annualEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: number;
  isLoading: boolean;
}

export const useStats = ({ amount }: IStatsProps): IUseStats => {
  const dispatchRequest = useDispatchRequest();

  const { data: ankrPrice, isFetching: isPriceLoading } = useGetAnkrPriceQuery(
    undefined,
    { refetchOnMountOrArgChange: CACHE_SECONDS },
  );

  const { data: totalInfo, isFetching: isTotalInfoLoading } =
    useGetProvidersTotalInfoQuery(undefined, {
      refetchOnMountOrArgChange: CACHE_SECONDS,
    });

  const { data: metricsData, loading: isMetricsLoading } = useQuery({
    type: getMetrics,
  });
  const apy = metricsData ? new BigNumber(metricsData.ankr.apy) : ZERO;

  const usdPrice = ankrPrice ?? ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, apy);

  const totalStaked = totalInfo?.totalTVL ?? ZERO;
  const totalStakedUsd = totalStaked.multipliedBy(usdPrice);

  // TODO remove it. Use cache tags instead of manual dispatch
  useProviderEffect(() => {
    dispatchRequest(getMetrics());
  }, [dispatchRequest]);

  const usdRatio = totalStaked && usdPrice;

  const yearlyEarningUSD = usdRatio
    ? usdRatio
        .multipliedBy(yearlyEarning)
        .decimalPlaces(DEFAULT_ROUNDING)
        .toFormat()
    : undefined;

  return {
    apyText: t('stake.stats.apy-value', {
      value: apy.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    }),
    annualEarning: yearlyEarning.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    annualEarningUSD: yearlyEarningUSD,
    totalStaked: getShortNumber(totalStaked),
    totalStakedUSD: totalStakedUsd?.toFormat(0),
    stakers: metricsData ? +metricsData.ankr.stakers : undefined,
    isLoading: isPriceLoading || isTotalInfoLoading || isMetricsLoading,
  };
};

function calculateYearlyEarning(
  amount: BigNumberish,
  apy: BigNumberish,
): BigNumber {
  return new BigNumber(amount).multipliedBy(apy).dividedBy(100);
}
