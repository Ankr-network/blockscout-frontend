import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { notarize } from 'modules/bridge/actions/notarize';
import { withdrawal } from 'modules/bridge/actions/withdrawal';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';

interface IUseWithdraw {
  isLoading: boolean;
  isReceived: boolean;
  txHash?: string;
  onClick: () => void;
}

export const useWithdraw = (): IUseWithdraw => {
  const dispatch = useDispatch();
  const { data: txHash, loading: isWithdrawalLoading } = useQuery({
    type: withdrawal,
  });

  const { data: notarizeData } = useQuery({
    type: notarize,
  });

  const withdrawalActionName = withdrawal.toString();

  const {
    isLoading: isReceiptLoading,
    isSuccessful,
    actionName: receiptActionName,
  } = useTxReceipt(withdrawalActionName);

  const onClick = useCallback(() => {
    if (!notarizeData) {
      return;
    }

    dispatch(
      withdrawal(
        notarizeData.encodedProof,
        notarizeData.encodedReceipt,
        notarizeData.signature,
      ),
    );
  }, [dispatch, notarizeData]);

  useEffect(() => {
    return () => {
      dispatch(resetRequests([withdrawalActionName, receiptActionName]));
    };
  }, [dispatch, receiptActionName, withdrawalActionName]);

  return {
    isLoading: isWithdrawalLoading || isReceiptLoading,
    isReceived: isSuccessful,
    txHash: txHash ?? undefined,
    onClick,
  };
};
