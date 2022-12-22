import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { useAddMaticOnEthTokenToWalletMutation } from 'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import {
  useGetMaticOnEthTxDataQuery,
  useGetMaticOnEthTxReceiptQuery,
} from 'modules/stake-matic/eth/actions/useGetMaticOnEthTxDataQuery';
import { useAppDispatch } from 'store/useAppDispatch';

import { POLLING_INTERVAL } from '../../const';

export interface IStakeMaticStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: FetchBaseQueryError | Error;
  handleAddTokenToWallet: () => void;
}

interface IStakeSuccessParams {
  tokenOut: TMaticSyntToken;
  txHash: string;
}

export const useStakePolygonStepsHook = (): IStakeMaticStepsHook => {
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();
  const [addMATICTokenToWallet] = useAddMaticOnEthTokenToWalletMutation();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetMaticOnEthTxDataQuery({ txHash });
  const { data: receipt } = useGetMaticOnEthTxReceiptQuery(
    { txHash },
    {
      pollingInterval: POLLING_INTERVAL,
    },
  );
  const { data: stats, refetch: refetchStats } = useGetMaticOnEthStatsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    if (!stats) {
      refetchStats();
    }
  }, [dispatch, txHash]);

  const onAddTokenClick = () => {
    addMATICTokenToWallet(tokenOut);
  };

  const calculatedAmount = useMemo(() => {
    const amount = data?.amount;
    const ratio = stats?.aMATICcRatio;

    if (!amount) {
      return undefined;
    }

    const isActiveForAC = tokenOut === Token.aMATICc && ratio;
    if (isActiveForAC) {
      return amount.multipliedBy(ratio);
    }

    return amount;
  }, [data?.amount, stats?.aMATICcRatio, tokenOut]);

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
