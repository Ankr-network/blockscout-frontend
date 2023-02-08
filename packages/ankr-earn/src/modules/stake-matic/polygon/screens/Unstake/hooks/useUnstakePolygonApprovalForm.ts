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
      data: approveData,
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
    amount: approveData?.amount,
    receiptName: RECEIPT_NAME,
    initialAllowance,
    isAllowanceLoading,
    getAllowance,
  });
};
