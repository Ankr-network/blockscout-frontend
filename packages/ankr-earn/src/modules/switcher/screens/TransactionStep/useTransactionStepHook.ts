import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { stopPolling, resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { getTxData, getTxReceipt } from 'modules/switcher/actions/getTxData';
import { addSwitcherTokenToWallet } from 'modules/switcher/actions/wallet';
import {
  AvailableSwitchNetwork,
  AvailableSwitcherToken,
} from 'modules/switcher/const';
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
  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const { txHash, to, from } = useParams<ISuccessPathParams>();
  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    dispatchRequest(
      getTxData({
        chainId: chainId as AvailableSwitchNetwork,
        txHash,
        token: from,
      }),
    );
    dispatchRequest(
      getTxReceipt({
        chainId: chainId as AvailableSwitchNetwork,
        txHash,
        token: from,
      }),
    );

    return () => {
      dispatch(resetRequests([getTxData.toString(), getTxReceipt.toString()]));
    };
  }, [chainId, txHash, from, dispatch]);

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, receipt]);

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addSwitcherTokenToWallet({
        chainId: chainId as AvailableSwitchNetwork,
        swapOption: to as AvailableSwitcherToken,
      }),
    );
  }, [chainId, to, dispatchRequest]);

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
