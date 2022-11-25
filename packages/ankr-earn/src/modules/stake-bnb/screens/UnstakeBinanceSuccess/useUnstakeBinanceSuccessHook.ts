import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import {
  useGetBNBTxReceiptQuery,
  useGetBNBUnstakeTxDataQuery,
} from 'modules/stake-bnb/actions/getTxData';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IUnstakeBinanceSuccessHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: FetchBaseQueryError | Error;
  handleAddTokenToWallet: () => void;
}

interface IUnstakeSuccessParams {
  token: TBnbSyntToken;
  txHash: string;
}

export const useUnstakeBinanceSuccessHook = (): IUnstakeBinanceSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetBNBUnstakeTxDataQuery({ txHash });
  const { data: receipt } = useGetBNBTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );
  const { data: stats, refetch } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const dispatch = useAppDispatch();
  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    if (!stats) {
      refetch();
    }
  }, [dispatch, txHash]);

  const onAddTokenClick = () => {
    addBNBTokenToWallet(token);
  };

  const amount = data?.amount ?? ZERO;

  const isPending = !receipt && !!data?.isPending;

  const destination =
    !data?.destinationAddress || new BigNumber(data.destinationAddress).isZero()
      ? undefined
      : data.destinationAddress;

  return {
    amount,
    destination,
    transactionId: txHash,
    tokenName: token,
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
