import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';
import { approve } from 'modules/stake-ankr/actions/approve';

interface IUseApprove {
  isLoading: boolean;
  isApproved: boolean;
  handleApprove: (amount: BigNumber) => void;
}

export const useApprove = (): IUseApprove => {
  const dispatch = useDispatch();
  const approveActionName = approve.toString();

  const {
    isLoading: isTxReceiptLoading,
    isSuccessful,
    actionName: txReceiptActionName,
  } = useTxReceipt(approveActionName);

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approve,
  });

  const isApproved = approveData?.isApproved || isSuccessful;
  const isLoading = isApproveLoading || isTxReceiptLoading;

  const handleApprove = (amount: BigNumber) => {
    dispatch(approve(amount));
  };

  useProviderEffect(() => {
    return () => {
      dispatch(resetRequests([txReceiptActionName, approveActionName]));
    };
  }, [dispatch]);

  return {
    isLoading,
    isApproved,
    handleApprove,
  };
};
