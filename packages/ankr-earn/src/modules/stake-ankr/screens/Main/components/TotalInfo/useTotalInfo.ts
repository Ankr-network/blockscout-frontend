import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface IUseTotalInfo {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  totalRewards: BigNumber;
  totalRewardsUsd: BigNumber;
  climableRewards: BigNumber;
  climableRewardsUsd: BigNumber;
  isTotalStakedLoading: boolean;
  isTotalRewardsLoading: boolean;
  isClimableRewardsLoading: boolean;
  stakeLink: string;
}

export const useTotalInfo = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const { data } = useQuery({
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
    totalRewards: data?.totalRewards ?? ZERO,
    totalRewardsUsd: ZERO,
    climableRewards: claimableRewards,
    climableRewardsUsd: ZERO,
    isTotalStakedLoading: false,
    isTotalRewardsLoading: false,
    isClimableRewardsLoading: false,
    stakeLink: RoutesConfig.stake.generatePath(),
  };
};
