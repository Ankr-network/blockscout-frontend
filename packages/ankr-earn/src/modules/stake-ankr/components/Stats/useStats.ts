import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProvidersTotalInfo } from 'modules/stake-ankr/actions/getProvidersTotalInfo';

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
  const dispatchRequest = useDispatchRequest();
  const { data: ankrAPY } = useQuery({
    type: getAPY,
  });
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });
  const { data: totalInfo } = useQuery({
    type: getProvidersTotalInfo,
  });

  const apy = ankrAPY ?? ZERO;
  const usdPrice = ankrPrice ?? ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, apy);

  // todo: use actual data
  const totalStaked = totalInfo?.totalTVL ?? ZERO;
  const totalStakedUsd = totalStaked.multipliedBy(usdPrice);
  const stakers = '0';

  useProviderEffect(() => {
    dispatchRequest(getAPY());
    dispatchRequest(getANKRPrice());
    dispatchRequest(getProvidersTotalInfo());
  }, [dispatchRequest]);

  const usdRatio = totalStaked && usdPrice;

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
