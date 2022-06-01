import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { approve } from 'modules/bridge/actions/approve';
import { useTxReceipt } from 'modules/bridge/hooks/useTxReceipt';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { SupportedChainIDS } from 'modules/common/const';

export interface IUseApproveArgs {
  token: AvailableBridgeTokens;
  chainId: SupportedChainIDS;
  amount?: BigNumber;
}

interface IUseApprove {
  isLoading: boolean;
  isApproved: boolean;
  onClick: () => void;
}

export const useApprove = ({
  token,
  chainId,
  amount,
}: IUseApproveArgs): IUseApprove => {
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

  const onClick = () => {
    if (!amount || amount.isZero()) {
      return;
    }

    dispatch(approve(amount, token, chainId));
  };

  useProviderEffect(() => {
    return () => {
      dispatch(resetRequests([txReceiptActionName, approveActionName]));
    };
  }, [dispatch]);

  return {
    isLoading,
    isApproved,
    onClick,
  };
};
