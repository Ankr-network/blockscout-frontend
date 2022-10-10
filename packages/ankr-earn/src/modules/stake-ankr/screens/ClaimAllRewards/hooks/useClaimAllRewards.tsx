import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { claimAllRewards } from 'modules/stake-ankr/actions/claimAllRewards';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { IStakingReward } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

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
  const dispatchRequest = useDispatchRequest();
  const { loading: claimLoading } = useMutation({ type: claimAllRewards });
  const { data, loading: dataLoading } = useQuery({
    type: getTotalInfo,
  });
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });

  useProviderEffect(() => {
    dispatchRequest(getTotalInfo());
  });

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

  const onClaim = useCallback(() => {
    dispatchRequest(claimAllRewards()).then(({ error }) => {
      if (!error) {
        sendAnalytics();
      }
    });
  }, [dispatchRequest, sendAnalytics]);

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
