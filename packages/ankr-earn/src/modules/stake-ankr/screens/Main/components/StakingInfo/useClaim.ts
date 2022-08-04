import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { claimAllUnstakes } from 'modules/stake-ankr/actions/claimAllUnstakes';
import { getAllClaimableUnstakes } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getHistoryData } from 'modules/stake-ankr/actions/getHistoryData';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';
import { IClaimableUnstake } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUseTotalInfo {
  isFewClaims: boolean;
  isSingleClaim: boolean;
  data: IClaimableUnstake[];
  isClaimsLoading: boolean;
  loading: boolean;
  total: BigNumber;
  totalUSD: BigNumber;
  isOpened: boolean;
  onClose: () => void;
  onOpen: () => void;
  onClaim: () => void;
}

export const useClaim = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const { loading } = useMutation({ type: claimAllUnstakes });
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });
  const { data, loading: isClaimsLoading } = useQuery({
    type: getAllClaimableUnstakes,
  });

  const preparedData = useMemo(
    () => data?.filter(unstake => !unstake.amount.isZero()) ?? [],
    [data],
  );

  const { isOpened, onClose, onOpen } = useDialog();

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
    dispatchRequest(claimAllUnstakes()).then(({ error }) => {
      if (!error) {
        dispatchRequest(
          getUnstakingData({
            usdPrice: ankrPrice ?? ZERO,
          }),
        );
        dispatchRequest(getHistoryData());
        onClose();
      }
    });
  }, [ankrPrice, dispatchRequest, onClose]);

  return {
    isFewClaims,
    isSingleClaim,
    data: preparedData,
    isClaimsLoading,
    loading,
    total,
    totalUSD,
    isOpened,
    onClose,
    onOpen,
    onClaim,
  };
};
