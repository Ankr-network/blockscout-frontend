import {
  RECEIPT_NAME,
  useApproveAnkrMaticOnPolygonUnstakeMutation,
} from 'modules/stake-matic/polygon/actions/approveAnkrMaticOnPolygonUnstake';
import { useLazyGetMaticOnPolygonAllowanceQuery } from 'modules/stake-matic/polygon/actions/getMaticOnPolygonAllowance';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export const useUnstakePolygonApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      isError: isApproveError,
    },
  ] = useApproveAnkrMaticOnPolygonUnstakeMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetMaticOnPolygonAllowanceQuery();

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
