import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getProviderDelegatedAmount } from 'modules/stake-mgno/actions/getProviderDelegatedAmount';
import { getProviderStats } from 'modules/stake-mgno/actions/getProviderStats';

interface IStatsProps {
  amount: BigNumberish;
  provider: string;
}

interface IUseStats {
  apyText: string;
  yearlyEarning: string;
  yearlyEarningUSD?: string;
  totalStaked?: string;
  totalStakedUSD?: string;
  stakers?: number;
  isLoading: boolean;
}

export const useStats = ({ amount, provider }: IStatsProps): IUseStats => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data: providerStats, loading: isProviderStatsLoading } = useQuery({
    type: getProviderStats,
  });
  const { data: usdRatio, loading: isUsdRatioLoading } = useQuery({
    type: getMGNOPrice,
  });
  const { data: delegatedAmount, loading: isDelegatedAmounLoading } = useQuery({
    type: getProviderDelegatedAmount,
  });

  useProviderEffect(() => {
    dispatchRequest(getProviderStats({ provider }));
    dispatchRequest(getMGNOPrice());
    dispatchRequest(getProviderDelegatedAmount({ provider }));

    return () => {
      dispatch(
        resetRequests([
          getMGNOPrice.toString(),
          getProviderDelegatedAmount.toString(),
        ]),
      );
    };
  }, []);

  const usdPrice = usdRatio ?? ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, ZERO);

  const totalStaked = delegatedAmount ?? ZERO;
  const totalStakedUsd = totalStaked.multipliedBy(usdPrice);

  const yearlyEarningUSD = usdRatio
    ? usdRatio
        .multipliedBy(yearlyEarning)
        .decimalPlaces(DEFAULT_ROUNDING)
        .toFormat()
    : undefined;

  return {
    apyText: t('stake.stats.apy-value', {
      value: ZERO.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    }),
    yearlyEarning: yearlyEarning.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    yearlyEarningUSD,
    stakers: providerStats?.stakers,
    totalStaked: getShortNumber(totalStaked),
    totalStakedUSD: totalStakedUsd?.toFormat(),
    isLoading:
      isProviderStatsLoading || isUsdRatioLoading || isDelegatedAmounLoading,
  };
};

function calculateYearlyEarning(
  amount: BigNumberish,
  apy: BigNumberish,
): BigNumber {
  return new BigNumber(amount).multipliedBy(apy).dividedBy(100);
}
