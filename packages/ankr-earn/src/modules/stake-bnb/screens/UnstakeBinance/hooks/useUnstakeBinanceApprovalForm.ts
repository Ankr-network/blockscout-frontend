import {
  RECEIPT_NAME,
  useApproveABNBCUnstakeMutation,
} from 'modules/stake-bnb/actions/approveABNBCUnstake';
import { useLazyGetBNBAllowanceQuery } from 'modules/stake-bnb/actions/useLazyGetBNBAllowanceQuery';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useUnstakeBinanceApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      data: approveData,
      isError: isApproveError,
    },
  ] = useApproveABNBCUnstakeMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetBNBAllowanceQuery();

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
