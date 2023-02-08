import {
  RECEIPT_NAME,
  useApproveABNBCForSwapPoolMutation,
} from 'modules/stake-bnb/actions/approveABNBCForSwapPool';
import { useLazyGetBNBSwapPoolAllowanceQuery } from 'modules/stake-bnb/actions/useLazyGetBNBSwapPoolAllowanceQuery';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useFlashUnstakeBinanceApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      data: approveData,
      isError: isApproveError,
    },
  ] = useApproveABNBCForSwapPoolMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetBNBSwapPoolAllowanceQuery();

  return useApprovalForm({
    approve,
    isApproveLoading,
    isApproveError,
    resetApprove,
    amount: approveData?.amount,
    receiptName: RECEIPT_NAME,
    initialAllowance,
    isAllowanceLoading,
    getAllowance,
  });
};
