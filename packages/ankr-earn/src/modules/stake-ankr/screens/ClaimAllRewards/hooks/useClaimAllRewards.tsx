import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useClaimAllRewardsMutation } from 'modules/stake-ankr/actions/claimAllRewards';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { IStakingReward } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { RoutesConfig } from 'modules/stake-ankr/RoutesConfig';

import { useAnalytics } from './useAnalytics';

interface IUseClaimAllRewards {
  availableClaims: IStakingReward[];
  isClaimAllowed: boolean;
  claimLoading: boolean;
  dataLoading: boolean;
  total: BigNumber;
  totalUSD: BigNumber;
  closeHref: string;
  onClaim: () => void;
}

export const useClaimAllRewards = (): IUseClaimAllRewards => {
  const [claimAllRewards, { isLoading: claimLoading }] =
    useClaimAllRewardsMutation();
  const {
    data,
    isFetching: dataLoading,
    refetch: getTotalInfoRefetch,
  } = useGetTotalInfoQuery();

  const { data: ankrPrice } = useGetAnkrPriceQuery();

  const availableClaims = useMemo(
    () => data?.claimableRewards ?? [],
    [data?.claimableRewards],
  );

  const isClaimAllowed = !!availableClaims?.length;

  const usdTokenPrice = ankrPrice ?? ZERO;

  const total = useMemo(
    () =>
      availableClaims.reduce((acc, claim) => {
        return acc.plus(claim.amount);
      }, ZERO),
    [availableClaims],
  );

  const { sendAnalytics } = useAnalytics(total);

  const totalUSD = total.multipliedBy(usdTokenPrice);

  useProviderEffect(() => {
    getTotalInfoRefetch();
  }, []);

  const onClaim = useCallback(() => {
    claimAllRewards()
      .unwrap()
      .catch(() => sendAnalytics());
  }, [claimAllRewards, sendAnalytics]);

  return {
    isClaimAllowed,
    claimLoading,
    dataLoading,
    availableClaims,
    total,
    totalUSD,
    closeHref: RoutesConfig.main.generatePath(),
    onClaim,
  };
};
