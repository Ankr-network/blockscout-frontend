import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';

interface IStatsProps {
  amount: BigNumberish;
  apy: BigNumber;
  isApyLoading: boolean;
}

interface IUseStats {
  apyText: string;
  yearlyEarning: string;
  yearlyEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: string;
  isLoading: boolean;
}

export const useStats = ({ amount, apy }: IStatsProps): IUseStats => {
  const usdPrice = ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, apy);

  // todo: use actual data
  const totalStaked = ZERO;
  const totalStakedUsd = totalStaked.multipliedBy(usdPrice);

  const usdRatio = ZERO;

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
    yearlyEarning: yearlyEarning.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    yearlyEarningUSD,
    stakers: '10',
    totalStaked: getShortNumber(totalStaked),
    totalStakedUSD: totalStakedUsd?.toFormat(0),
    isLoading: false,
  };
};

function calculateYearlyEarning(
  amount: BigNumberish,
  apy: BigNumberish,
): BigNumber {
  return new BigNumber(amount).multipliedBy(apy).dividedBy(100);
}
