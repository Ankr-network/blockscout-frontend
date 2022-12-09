import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import {
  useGetBNBTxDataQuery,
  useGetBNBTxReceiptQuery,
} from 'modules/stake-bnb/actions/getTxData';
import { useGetBNBStakeStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStakeStatsQuery';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeBinanceStepsHook {
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
  tokenOut: TBnbSyntToken;
  txHash: string;
}

export const useStakeBinanceStepsHook = (): IStakeBinanceStepsHook => {
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetBNBTxDataQuery({ txHash });
  const { data: receipt } = useGetBNBTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );
  const { data: stats, refetch: statsRefetch } = useGetBNBStatsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );
  const { data: stakeStats, refetch: stakeStatsRefetch } =
    useGetBNBStakeStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const dispatch = useAppDispatch();
  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    if (!stats) {
      statsRefetch();
    }
    if (!stakeStats) {
      stakeStatsRefetch();
    }
  }, [dispatch, txHash]);

  const onAddTokenClick = () => {
    addBNBTokenToWallet(tokenOut);
  };

  const calculatedAmount = useMemo(() => {
    const ratio = stats?.aBNBcRatio;
    const isActiveForAC = tokenOut === Token.aBNBc && ratio;
    if (isActiveForAC) {
      return new BigNumber(receipt?.certAmount ?? ZERO);
    }

    const amount = data?.amount;

    const relayerFee = stakeStats?.relayerFee;

    if (!amount || !relayerFee) {
      return undefined;
    }

    const amountWithoutFee = amount.minus(relayerFee);

    return amountWithoutFee;
  }, [
    data?.amount,
    receipt,
    stats?.aBNBcRatio,
    stakeStats?.relayerFee,
    tokenOut,
  ]);

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
