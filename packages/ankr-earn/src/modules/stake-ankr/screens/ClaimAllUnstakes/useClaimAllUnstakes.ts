import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useClaimAllUnstakesMutation } from 'modules/stake-ankr/actions/claimAllUnstakes';
import { useLazyGetAllClaimableUnstakesQuery } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { IClaimableUnstake } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

import { RoutesConfig } from '../../RoutesConfig';

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
  const [claimAllUnstakes, { isLoading: loading }] =
    useClaimAllUnstakesMutation();

  const [getAllClaimableUnstakes, { data, isFetching: isClaimsLoading }] =
    useLazyGetAllClaimableUnstakesQuery();

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
    getAllClaimableUnstakes();
  }, [dispatchRequest]);

  const onClaim = useCallback(() => {
    claimAllUnstakes();
  }, [claimAllUnstakes]);

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
