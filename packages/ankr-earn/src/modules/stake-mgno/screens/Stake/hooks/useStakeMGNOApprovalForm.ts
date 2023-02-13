import {
  RECEIPT_NAME,
  useApproveMNGOStakeMutation,
} from 'modules/stake-mgno/actions/approveMNGOStake';
import { useLazyGetMNGOAllowanceQuery } from 'modules/stake-mgno/actions/getMNGOAllowance';
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
  ] = useLazyGetMNGOAllowanceQuery();

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
