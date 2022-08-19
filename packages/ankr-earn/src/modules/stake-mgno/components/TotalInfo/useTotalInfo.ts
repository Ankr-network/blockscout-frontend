import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

interface IUseTotalInfo {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  climableRewards: BigNumber;
  climableRewardsUsd: BigNumber;
  isTotalStakedLoading: boolean;
  isClimableRewardsLoading: boolean;
  stakeLink: string;
}

export const useTotalInfo = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading } = useQuery({
    type: getTotalInfo,
  });

  const claimableRewards = useMemo(() => {
    if (!data?.claimableRewards) return ZERO;

    return data.claimableRewards.reduce((acc, reward) => {
      if (reward.amount.isZero()) return acc;

      acc = acc.plus(reward.amount);

      return acc;
    }, ZERO);
  }, [data?.claimableRewards]);

  useProviderEffect(() => {
    dispatchRequest(getTotalInfo());
  }, [dispatchRequest]);

  return {
    totalStaked: data?.totalDelegatedAmount ?? ZERO,
    totalStakedUsd: ZERO,
    climableRewards: claimableRewards.decimalPlaces(DEFAULT_ROUNDING),
    climableRewardsUsd: ZERO,
    isTotalStakedLoading: loading,
    isClimableRewardsLoading: loading,
    stakeLink: RoutesConfig.stake.generatePath(),
  };
};
