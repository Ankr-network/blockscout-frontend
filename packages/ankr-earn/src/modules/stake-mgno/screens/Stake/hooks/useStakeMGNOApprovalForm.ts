import {
  RECEIPT_NAME,
  useApproveMNGOStakeMutation,
} from 'modules/stake-mgno/actions/approveMNGOStake';
import { useLazyGetAllowanceQuery } from 'modules/stake-mgno/actions/getAllowance';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useStakeMGNOApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      isError: isApproveError,
    },
  ] = useApproveMNGOStakeMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetAllowanceQuery();

  return useApprovalForm({
    isApproveLoading,
    receiptName: RECEIPT_NAME,
    initialAllowance,
    isAllowanceLoading,
    approve,
    resetApprove,
    getAllowance,
    isApproveError,
  });
};
