import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics/const';

interface IStatsProps {
  apy: BigNumber;
  amount: BigNumberish;
  metricsServiceName: EMetricsServiceName;
}

interface IUseStakeStats {
  apy: string;
  yearlyEarning: string;
  yearlyEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: string;
}

export const useStakeStats = ({
  apy: rawApy,
  amount,
  metricsServiceName,
}: IStatsProps): IUseStakeStats => {
  const { data: metricsData } = useQuery({
    type: getMetrics,
  });

  const apy = rawApy.decimalPlaces(DEFAULT_ROUNDING).toFixed();
  const yearlyEarning = calculateYearlyEarning(amount, apy).toFormat();

  const metrics = useMemo(
    () => metricsData?.find(x => x.name === metricsServiceName),
    [metricsServiceName, metricsData],
  );

  const totalStaked = metrics ? metrics.totalStaked : ZERO;
  const totalStakedUsd = metrics ? metrics.totalStakedUsd : ZERO;
  const stakers = metrics?.stakers.toFormat();

  const usdRatio =
    metrics && !totalStaked.isZero() ? totalStakedUsd.div(totalStaked) : ZERO;

  const yearlyEarningUSD = usdRatio
    ? usdRatio.multipliedBy(yearlyEarning).toFormat(DEFAULT_ROUNDING)
    : undefined;

  return {
    apy,
    yearlyEarning,
    yearlyEarningUSD,
    totalStaked: totalStaked.toFormat(DEFAULT_ROUNDING),
    totalStakedUSD: totalStakedUsd.toFormat(0),
    stakers,
  };
};

function calculateYearlyEarning(amount: BigNumberish, apy: string): BigNumber {
  return new BigNumber(amount).multipliedBy(apy).dividedBy(100);
}
