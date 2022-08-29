import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

interface IUseTotalInfo {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  validationRewards: BigNumber;
  validationRewardsUsd: BigNumber;
  isTotalStakedLoading: boolean;
  isRewardsLoading: boolean;
  stakeLink: string;
}

export const useTotalInfo = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading } = useQuery({
    type: getTotalInfo,
  });
  const { data: usdRatio, loading: isUsdRatioLoading } = useQuery({
    type: getMGNOPrice,
  });

  useProviderEffect(() => {
    dispatchRequest(getTotalInfo());
    dispatchRequest(getMGNOPrice());
  }, [dispatchRequest]);

  const usdPrice = usdRatio ?? ZERO;
  const totalStaked = data?.myTotalDelegatedAmount ?? ZERO;
  const validationRewards = data?.myAllValidationRewards ?? ZERO;

  return {
    totalStaked: totalStaked.decimalPlaces(DEFAULT_ROUNDING),
    totalStakedUsd: totalStaked.multipliedBy(usdPrice),
    validationRewards: validationRewards.decimalPlaces(DEFAULT_ROUNDING),
    validationRewardsUsd: validationRewards.multipliedBy(usdPrice),
    isTotalStakedLoading: loading || isUsdRatioLoading,
    isRewardsLoading: loading || isUsdRatioLoading,
    stakeLink: RoutesConfig.stake.generatePath(),
  };
};
