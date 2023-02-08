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
    receiptName: RECEIPT_NAME,
    initialAllowance,
    isAllowanceLoading,
    getAllowance,
  });
};
