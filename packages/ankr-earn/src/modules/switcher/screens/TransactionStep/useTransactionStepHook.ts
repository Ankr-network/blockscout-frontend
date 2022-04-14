import { stopPolling, resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { getTxData, getTxReceipt } from 'modules/switcher/actions/getTxData';
import { addSwitcherTokenToWallet } from 'modules/switcher/actions/wallet';
import { useAppDispatch } from 'store/useAppDispatch';

export interface ITransactionStepHookData {
  isLoading: boolean;
  isPending: boolean;
  txHash: string;
  symbol: Token;
  destinationAddress?: string;
  amount?: BigNumber;
  error?: Error;
  handleAddTokenToWallet: () => void;
}

interface ISuccessPathParams {
  txHash: string;
  from: Token;
  to: Token;
}

export const useTransactionStepHook = (): ITransactionStepHookData => {
  const { txHash, to } = useParams<ISuccessPathParams>();
  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash }));
    dispatchRequest(getTxReceipt({ txHash }));

    return () => {
      dispatch(resetRequests([getTxData.toString(), getTxReceipt.toString()]));
    };
  }, [dispatch, txHash]);

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, receipt]);

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addSwitcherTokenToWallet({
        swapOption: to as Token,
      }),
    );
  }, [to, dispatchRequest]);

  return {
    txHash,
    symbol: to,
    isLoading,
    error: error || txFailError,
    isPending: !receipt,
    amount: data?.amount,
    destinationAddress: data?.destinationAddress,
    handleAddTokenToWallet,
  };
};
