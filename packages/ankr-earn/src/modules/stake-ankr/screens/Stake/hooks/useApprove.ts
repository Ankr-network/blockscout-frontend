import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';
import {
  RECEIPT_NAME,
  useApproveMutation,
} from 'modules/stake-ankr/actions/approve';

interface IUseApprove {
  isLoading: boolean;
  isApproved: boolean;
  handleApprove: (amount: BigNumber) => void;
}

export const useApprove = (): IUseApprove => {
  const dispatch = useDispatch();
  const [
    approve,
    { data: approveData, isLoading: isApproveLoading, reset: resetApprove },
  ] = useApproveMutation();

  const {
    isLoading: isTxReceiptLoading,
    isSuccessful,
    actionName: txReceiptActionName,
  } = useTxReceipt(RECEIPT_NAME);

  const isApproved = approveData?.isApproved || isSuccessful;
  const isLoading = isApproveLoading || isTxReceiptLoading;

  const handleApprove = (amount: BigNumber) => {
    approve(amount);
  };

  useProviderEffect(() => {
    return () => {
      resetApprove();
      dispatch(resetRequests([txReceiptActionName]));
    };
  }, [dispatch]);

  return {
    isLoading,
    isApproved,
    handleApprove,
  };
};
