import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

// import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetEpochEndSecondsQuery } from 'modules/stake-ankr/actions/getEpochEndSeconds';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/RoutesConfig';
import { CACHE_SECONDS } from 'modules/stake-ankr/screens/Providers/const';
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
  epochEnds?: string;
  epochLoading: boolean;
}

export const useTotalInfo = (): IUseTotalInfo => {
  const {
    data,
    isFetching: loading,
    refetch: getTotalInfoRefetch,
  } = useGetTotalInfoQuery(undefined, {
    refetchOnMountOrArgChange: CACHE_SECONDS,
  });
  const { data: ankrPrice } = useGetAnkrPriceQuery(undefined, {
    refetchOnMountOrArgChange: CACHE_SECONDS,
  });

  const { data: epochEndsSeconds, isFetching: epochLoading } =
    useGetEpochEndSecondsQuery(undefined, {
      pollingInterval: 60_000,
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

  // TODO remove it. Use cache tags instead of manual dispatch
  useProviderEffect(() => {
    getTotalInfoRefetch();
  }, []);

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
