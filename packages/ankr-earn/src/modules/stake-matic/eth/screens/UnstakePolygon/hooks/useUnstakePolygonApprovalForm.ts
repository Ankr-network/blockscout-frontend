import BigNumber from 'bignumber.js';

import {
  RECEIPT_NAME,
  useApproveAnkrMaticUnstakeMutation,
} from 'modules/stake-matic/eth/actions/approveAnkrMaticUnstake';
import { useLazyGetMaticOnEthAllowanceQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthAllowance';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

export interface IApprovalFormArgs {
  approve: (amount: BigNumber) => void;
  isApproveLoading: boolean;
  resetApprove: VoidFunction;
  approveData: { amount: BigNumber };
  receiptName: string;
}

export const useUnstakePolygonApprovalForm = (): IUseApprovalForm => {
  const [
    approve,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      data: approveData,
      isError: isApproveError,
    },
  ] = useApproveAnkrMaticUnstakeMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetMaticOnEthAllowanceQuery();

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
