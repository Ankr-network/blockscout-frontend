import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { addFTMTokenToWallet } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import {
  getTxData,
  getTxReceipt,
} from 'modules/stake-fantom/actions/getTxData';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeFantomStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: Error;
  handleAddTokenToWallet: () => void;
}

interface IStakeSuccessParams {
  txHash: string;
  destination: string;
}

export const useStakeFantomStepsHook = (): IStakeFantomStepsHook => {
  const { txHash } = useParams<IStakeSuccessParams>();
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

  const onAddTokenClick = () => {
    dispatchRequest(addFTMTokenToWallet(Token.aFTMb));
  };

  return {
    amount: data?.amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: Token.aFTMb,
    isLoading,
    isPending: !receipt,
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
