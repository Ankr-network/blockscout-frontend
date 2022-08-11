import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { claimAllUnstakes } from 'modules/stake-ankr/actions/claimAllUnstakes';
import { getAllClaimableUnstakes } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { IClaimableUnstake } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface IUseTotalInfo {
  isFewClaims: boolean;
  isSingleClaim: boolean;
  data: IClaimableUnstake[];
  isClaimsLoading: boolean;
  loading: boolean;
  total: BigNumber;
  totalUSD: BigNumber;
  closeHref: string;
  onClaim: () => void;
}

export const useClaimAllUnstakes = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const { loading } = useMutation({ type: claimAllUnstakes });
  const { data, loading: isClaimsLoading } = useQuery({
    type: getAllClaimableUnstakes,
  });

  const preparedData = useMemo(
    () => data?.filter(unstake => !unstake.amount.isZero()) ?? [],
    [data],
  );

  const isFewClaims = preparedData.length > 1;
  const isSingleClaim = preparedData.length === 1;

  const total = useMemo(
    () =>
      preparedData.reduce((acc, claim) => {
        return acc.plus(claim.amount);
      }, ZERO),
    [preparedData],
  );

  const usdTokenPrice = 0;
  const totalUSD = total.multipliedBy(usdTokenPrice);

  useProviderEffect(() => {
    dispatchRequest(getAllClaimableUnstakes());
  }, [dispatchRequest]);

  const onClaim = useCallback(() => {
    dispatchRequest(claimAllUnstakes());
  }, [dispatchRequest]);

  return {
    isFewClaims,
    isSingleClaim,
    data: preparedData,
    isClaimsLoading,
    loading,
    total,
    totalUSD,
    closeHref: RoutesConfig.main.generatePath(),
    onClaim,
  };
};
