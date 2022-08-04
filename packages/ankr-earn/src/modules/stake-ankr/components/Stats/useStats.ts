import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';

interface IStatsProps {
  amount: BigNumberish;
}

interface IUseStats {
  apy: string;
  yearlyEarning: string;
  yearlyEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: string;
}

export const useStats = ({ amount }: IStatsProps): IUseStats => {
  const apy = ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, apy);

  // todo: use actual data
  const totalStaked = ZERO;
  const totalStakedUsd = ZERO;
  const stakers = '0';

  const usdRatio = totalStaked && totalStakedUsd?.div(totalStaked);

  const yearlyEarningUSD = usdRatio
    ? usdRatio
        .multipliedBy(yearlyEarning)
        .decimalPlaces(DEFAULT_ROUNDING)
        .toFormat()
    : undefined;

  return {
    apy: t('stake.stats.apy-value', {
      value: apy.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    }),
    yearlyEarning: yearlyEarning.toFormat(),
    yearlyEarningUSD,
    totalStaked: totalStaked?.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    totalStakedUSD: totalStakedUsd?.toFormat(0),
    stakers,
  };
};

function calculateYearlyEarning(
  amount: BigNumberish,
  apy: BigNumberish,
): BigNumber {
  return new BigNumber(amount).multipliedBy(apy).dividedBy(100);
}
