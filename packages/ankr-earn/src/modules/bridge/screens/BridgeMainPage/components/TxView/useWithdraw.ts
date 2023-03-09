import { useCallback } from 'react';

import { useWithdrawalBridgeMutation } from 'modules/bridge/actions/withdrawalBridge';
import { IBridgeNotarizeResponse } from 'modules/bridge/api/types';
import { WITHDRAWAL_ACTION_NAME } from 'modules/bridge/const';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';

interface IUseWithdraw {
  isLoading: boolean;
  isReceived: boolean;
  txHash?: string;
  onClick: () => void;
}

export const useWithdraw = (
  notarizeData?: IBridgeNotarizeResponse,
): IUseWithdraw => {
  const [withdrawalBridge, { data: txHash, isLoading: isWithdrawalLoading }] =
    useWithdrawalBridgeMutation();

  const { isLoading: isReceiptLoading, isSuccessful } = useTxReceipt(
    WITHDRAWAL_ACTION_NAME,
  );

  const onClick = useCallback(() => {
    if (!notarizeData) {
      return;
    }

    withdrawalBridge({
      proof: notarizeData.encodedProof,
      receipt: notarizeData.encodedReceipt,
      signature: notarizeData.signature,
    });
  }, [notarizeData, withdrawalBridge]);

  return {
    isLoading: isWithdrawalLoading || isReceiptLoading,
    isReceived: isSuccessful,
    txHash: txHash ?? undefined,
    onClick,
  };
};
