import { stopPolling, resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { getTxData, getTxReceipt } from 'modules/switcher/actions/getTxData';
import { addSwitcherTokenToWallet } from 'modules/switcher/actions/wallet';
import { TSwapOption } from 'modules/switcher/types';
import { useAppDispatch } from 'store/useAppDispatch';

import { TOKENS } from '../../const';

export interface ITransactionStepHookData {
  isLoading: boolean;
  isPending: boolean;
  txHash: string;
  symbol: TSwapOption;
  destinationAddress?: string;
  amount?: BigNumber;
  error?: Error;
  handleAddTokenToWallet: () => void;
}

interface ISuccessPathParams {
  txHash: string;
  swapOption: TSwapOption;
}

export const useTransactionStepHook = (): ITransactionStepHookData => {
  const { txHash, swapOption } = useParams<ISuccessPathParams>();
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
        swapOption: TOKENS[swapOption],
      }),
    );
  }, [swapOption, dispatchRequest]);

  return {
    txHash,
    symbol: TOKENS[swapOption],
    isLoading,
    error: error || txFailError,
    isPending: !receipt,
    amount: data?.amount,
    destinationAddress: data?.destinationAddress,
    handleAddTokenToWallet,
  };
};
