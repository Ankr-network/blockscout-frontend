import {
  RECEIPT_NAME,
  useApproveAnkrMutation,
} from 'modules/stake-ankr/actions/approve';
import { useLazyGetAnkrAllowanceQuery } from 'modules/stake-ankr/actions/getAnkrAllowance';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useStakeAnkrApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      isError: isApproveError,
    },
  ] = useApproveAnkrMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetAnkrAllowanceQuery();

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
