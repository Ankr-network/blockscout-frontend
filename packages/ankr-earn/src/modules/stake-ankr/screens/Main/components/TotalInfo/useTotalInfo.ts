import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getEpochEndSeconds } from 'modules/stake-ankr/actions/getEpochEndSeconds';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getEndEpochText } from 'modules/stake-ankr/utils/getEndEpochText';
import { useAppDispatch } from 'store/useAppDispatch';

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
  epochEnds?: string;
  epochLoading: boolean;
}

export const useTotalInfo = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const { data, loading } = useQuery({
    type: getTotalInfo,
  });
  const { data: ankrPrice } = useQuery({ type: getANKRPrice });
  const { data: epochEndsSeconds, loading: epochLoading } = useQuery({
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

    return () => {
      dispatch(resetRequests([getEpochEndSeconds.toString()]));
    };
  }, [dispatchRequest]);

  useEffect(() => {
    return () => {
      dispatch(stopPolling([getEpochEndSeconds.toString()]));
    };
  }, [dispatch]);

  const epochEnds = epochEndsSeconds
    ? getEndEpochText(epochEndsSeconds)
    : undefined;

  const totalStaked = data?.totalDelegatedAmount ?? ZERO;

  return {
    totalStaked,
    totalStakedUsd: totalStaked.multipliedBy(usdPrice) ?? ZERO,
    climableRewards: claimableRewards.decimalPlaces(DEFAULT_ROUNDING),
    climableRewardsUsd: claimableRewards.multipliedBy(usdPrice) ?? ZERO,
    isTotalStakedLoading: loading,
    isClimableRewardsLoading: loading,
    isClaimAllowed: !claimableRewards.isZero(),
    claimAllRewardsLink: RoutesConfig.claimAllRewards.generatePath(),
    stakeLink: RoutesConfig.stake.generatePath(),
    epochEnds,
    epochLoading,
  };
};
