import {
  RECEIPT_NAME,
  useApproveAnkrMutation,
} from 'modules/stake-ankr/actions/approve';
import { useLazyGetAllowanceQuery } from 'modules/stake-ankr/actions/getAllowance';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useStakeAnkrApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      data: approveData,
      isError: isApproveError,
    },
  ] = useApproveAnkrMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetAllowanceQuery();

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
