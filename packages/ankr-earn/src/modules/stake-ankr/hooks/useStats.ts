import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProvidersTotalInfo } from 'modules/stake-ankr/actions/getProvidersTotalInfo';

interface IStatsProps {
  amount: BigNumberish;
  apy: BigNumber;
  isApyLoading: boolean;
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

export const useStats = ({
  amount,
  apy,
  isApyLoading,
}: IStatsProps): IUseStats => {
  const dispatchRequest = useDispatchRequest();
  const { data: ankrPrice, loading: isPriceLoading } = useQuery({
    type: getANKRPrice,
  });
  const { data: totalInfo, loading: isTotalInfoLoading } = useQuery({
    type: getProvidersTotalInfo,
  });

  const usdPrice = ankrPrice ?? ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, apy);

  // todo: use actual data
  const totalStaked = totalInfo?.totalTVL ?? ZERO;
  const totalStakedUsd = totalStaked.multipliedBy(usdPrice);

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
    apyText: t('stake.stats.apy-value', {
      value: apy.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    }),
    annualEarning: yearlyEarning.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    annualEarningUSD: yearlyEarningUSD,
    totalStaked: getShortNumber(totalStaked),
    totalStakedUSD: totalStakedUsd?.toFormat(0),
    isLoading: isPriceLoading || isTotalInfoLoading || isApyLoading,
  };
};

function calculateYearlyEarning(
  amount: BigNumberish,
  apy: BigNumberish,
): BigNumber {
  return new BigNumber(amount).multipliedBy(apy).dividedBy(100);
}
