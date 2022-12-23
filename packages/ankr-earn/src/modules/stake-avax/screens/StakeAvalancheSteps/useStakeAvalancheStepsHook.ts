import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAddAVAXTokenToWalletMutation } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import {
  useGetAVAXTxDataQuery,
  useGetAVAXTxReceiptQuery,
} from 'modules/stake-avax/actions/getTxData';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { TAvaxSyntToken } from 'modules/stake-avax/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeAvalancheStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: FetchBaseQueryError;
  handleAddTokenToWallet: () => void;
}

interface IStakeSuccessParams {
  tokenOut: TAvaxSyntToken;
  txHash: string;
}

export const useStakeAvalancheStepsHook = (): IStakeAvalancheStepsHook => {
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetAVAXTxDataQuery({ txHash });
  const { data: receipt } = useGetAVAXTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );
  const { data: stats, refetch } = useGetAVAXCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });
  const [addAVAXTokenToWallet] = useAddAVAXTokenToWalletMutation();

  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    if (!stats) {
      refetch();
    }

    return () => {};
  }, [dispatch, txHash]);

  const onAddTokenClick = () => {
    addAVAXTokenToWallet(tokenOut);
  };

  // todo: get this value using txn decoding (https://ankrnetwork.atlassian.net/browse/STAKAN-1309)
  const calculatedAmount = useMemo(() => {
    const amount = data?.amount;
    const ratio = stats?.aAVAXcRatio;

    if (!amount) return undefined;

    const isActiveForAC = tokenOut === Token.aAVAXc && ratio;
    if (isActiveForAC) {
      return amount.multipliedBy(ratio);
    }
    return amount;
  }, [data?.amount, stats?.aAVAXcRatio, tokenOut]);

  const isPending = !receipt && !!data?.isPending;

  return {
    amount: calculatedAmount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: tokenOut,
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
