import { t } from '@ankr.com/common';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getApr } from 'modules/stake-mgno/actions/getApr';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getProviderDelegatedAmount } from 'modules/stake-mgno/actions/getProviderDelegatedAmount';
import { getProviderStats } from 'modules/stake-mgno/actions/getProviderStats';

interface IStatsProps {
  amount: BigNumberish;
  provider: string;
}

interface IUseStats {
  apyText: string;
  annualEarning: string;
  annualEarningUSD?: string;
  delegatedAmount: BigNumber;
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
  const { data: apr, loading: isAprLoading } = useQuery({
    type: getApr,
  });

  useProviderEffect(() => {
    dispatchRequest(getProviderStats({ provider }));
    dispatchRequest(getMGNOPrice());
    dispatchRequest(getProviderDelegatedAmount({ provider }));
    dispatchRequest(getApr({ provider }));

    return () => {
      dispatch(
        resetRequests([
          getMGNOPrice.toString(),
          getProviderDelegatedAmount.toString(),
          getApr.toString(),
        ]),
      );
    };
  }, []);

  const statsApr = apr ?? ZERO;
  const usdPrice = usdRatio ?? ZERO;
  const yearlyEarning = calculateYearlyEarning(amount, statsApr);

  const totalStaked = delegatedAmount ?? ZERO;
  const totalStakedUsd = totalStaked.multipliedBy(usdPrice);

  const yearlyEarningUSD = usdRatio
    ? usdRatio
        .multipliedBy(yearlyEarning)
        .decimalPlaces(DEFAULT_ROUNDING)
        .toFormat()
    : undefined;

  const apyText = statsApr.isZero()
    ? t('common.n-a')
    : t('stake.stats.apy-value', {
        value: statsApr.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
      });

  return {
    apyText,
    annualEarning: yearlyEarning.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    annualEarningUSD: yearlyEarningUSD,
    stakers: providerStats?.stakers ?? undefined,
    delegatedAmount: totalStaked,
    totalStaked: getShortNumber(totalStaked),
    totalStakedUSD: totalStakedUsd?.toFormat(),
    isLoading:
      isProviderStatsLoading ||
      isUsdRatioLoading ||
      isDelegatedAmounLoading ||
      isAprLoading,
  };
};

function calculateYearlyEarning(
  amount: BigNumberish,
  apr: BigNumberish,
): BigNumber {
  return new BigNumber(amount).multipliedBy(apr).dividedBy(100);
}
