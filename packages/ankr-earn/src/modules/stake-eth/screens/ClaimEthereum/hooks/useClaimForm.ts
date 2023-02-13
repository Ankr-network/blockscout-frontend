import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ONE, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/dashboard/Routes';
import { useClaimETHMutation } from 'modules/stake-eth/actions/claim';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';

interface IUseClaimForm {
  nativeAmount: BigNumber;
  balance: BigNumber;
  closeHref: string;
  isBalanceLoading: boolean;
  isLoading: boolean;
  totalAmount: BigNumber;
  onSubmit: () => void;
}

export const useClaimForm = (): IUseClaimForm => {
  const dispatchRequest = useDispatchRequest();
  const [claim, { isLoading }] = useClaimETHMutation();

  const {
    data: commonData,
    isFetching: isCommonDataLoading,
    refetch: getETHCommonDataRefetch,
  } = useGetETHCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const {
    data: claimableData,
    isFetching: isClaimableDataLoading,
    refetch: getETHClaimableDataRefetch,
  } = useGetETHClaimableDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const balance = claimableData?.claimableAETHB ?? ZERO;

  const nativeAmount = commonData ? ONE.div(commonData.aETHcRatio) : ZERO;

  const onSubmit = () => {
    claim(Token.aETHc);
  };

  useProviderEffect(() => {
    getETHCommonDataRefetch();
    getETHClaimableDataRefetch();
  }, [dispatchRequest]);

  return {
    balance,
    totalAmount: claimableData?.claimableAETHC ?? ZERO,
    nativeAmount,
    isLoading: isLoading || isClaimableDataLoading,
    isBalanceLoading: isCommonDataLoading,
    closeHref: RoutesConfig.dashboard.generatePath(),
    onSubmit,
  };
};
