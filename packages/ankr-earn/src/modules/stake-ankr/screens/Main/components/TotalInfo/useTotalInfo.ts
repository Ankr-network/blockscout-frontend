import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getEpochEndSeconds } from 'modules/stake-ankr/actions/getEpochEndSeconds';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getEndEpochText } from 'modules/stake-ankr/utils/getEndEpochText';

interface IUseTotalInfo {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  climableRewards: BigNumber;
  climableRewardsUsd: BigNumber;
  isTotalStakedLoading: boolean;
  isClimableRewardsLoading: boolean;
  isClaimAllowed: boolean;
  stakeLink: string;
  claimAllRewardsLink: string;
  epochEnds: string;
}

export const useTotalInfo = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const { data } = useQuery({
    type: getTotalInfo,
  });
  const { data: ankrPrice } = useQuery({ type: getANKRPrice });
  const { data: epochEndsSeconds } = useQuery({
    type: getEpochEndSeconds,
  });
  const usdPrice = ankrPrice ?? ZERO;

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
    dispatchRequest(getEpochEndSeconds());
  }, [dispatchRequest]);

  const epochEnds = getEndEpochText(epochEndsSeconds ?? 0);

  const totalStaked = data?.totalDelegatedAmount ?? ZERO;

  return {
    totalStaked,
    totalStakedUsd: totalStaked.multipliedBy(usdPrice) ?? ZERO,
    climableRewards: claimableRewards.decimalPlaces(DEFAULT_ROUNDING),
    climableRewardsUsd: claimableRewards.multipliedBy(usdPrice) ?? ZERO,
    isTotalStakedLoading: false,
    isClimableRewardsLoading: false,
    isClaimAllowed: !claimableRewards.isZero(),
    claimAllRewardsLink: RoutesConfig.claimAllRewards.generatePath(),
    stakeLink: RoutesConfig.stake.generatePath(),
    epochEnds,
  };
};
