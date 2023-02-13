import { useEffect } from 'react';

import {
  RECEIPT_NAME,
  useApproveABNBCForSwapPoolMutation,
} from 'modules/stake-bnb/actions/approveABNBCForSwapPool';
import { useLazyGetBNBSwapPoolAllowanceQuery } from 'modules/stake-bnb/actions/useLazyGetBNBSwapPoolAllowanceQuery';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useFlashUnstakeBinanceApprovalForm = (
  isFlash: boolean,
): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      isError: isApproveError,
    },
  ] = useApproveABNBCForSwapPoolMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetBNBSwapPoolAllowanceQuery();

  useEffect(() => {
    if (isFlash) {
      getAllowance();
    }
  }, [getAllowance, isFlash]);

  return useApprovalForm({
    approve,
    isApproveLoading,
    isApproveError,
    resetApprove,
    receiptName: RECEIPT_NAME,
    initialAllowance,
    isAllowanceLoading,
    getAllowance,
    shouldFetchAllowance: isFlash,
  });
};
