import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useParams } from 'react-router';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { useAddSwitchTokenToWalletMutation } from 'modules/switcher/actions/addSwitchTokenToWallet';
import {
  useGetSwitcherTxDataQuery,
  useGetSwitcherTxReceiptQuery,
} from 'modules/switcher/actions/getSwitcherTxData';
import {
  AvailableSwitchNetwork,
  AvailableSwitcherToken,
  POLING_INTERVAL,
} from 'modules/switcher/const';

export interface ITransactionStepHookData {
  isLoading: boolean;
  isPending: boolean;
  txHash: string;
  symbol: Token;
  destinationAddress?: string;
  amount?: BigNumber;
  error?: FetchBaseQueryError | Error;
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
  const [addSwitcherTokenToWallet] = useAddSwitchTokenToWalletMutation();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetSwitcherTxDataQuery({
    txHash,
    chainId: chainId as AvailableSwitchNetwork,
    token: from as AvailableSwitcherToken,
  });
  const { data: receipt } = useGetSwitcherTxReceiptQuery(
    {
      chainId: chainId as AvailableSwitchNetwork,
      txHash,
      token: from as AvailableSwitcherToken,
    },
    {
      pollingInterval: POLING_INTERVAL,
    },
  );

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const handleAddTokenToWallet = useCallback(() => {
    addSwitcherTokenToWallet({
      chainId: chainId as AvailableSwitchNetwork,
      swapOption: to as AvailableSwitcherToken,
    });
  }, [addSwitcherTokenToWallet, chainId, to]);

  return {
    txHash,
    symbol: to,
    isLoading,
    error: (error as FetchBaseQueryError) || txFailError,
    isPending: !receipt,
    amount: data?.amount,
    destinationAddress: data?.destinationAddress,
    handleAddTokenToWallet,
  };
};
