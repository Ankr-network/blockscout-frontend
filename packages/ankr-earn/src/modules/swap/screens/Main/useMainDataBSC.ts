import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { AVAILABLE_BNB_SYNT_TOKENS } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import {
  useGetBNBTxDataQuery,
  useGetBNBTxReceiptQuery,
} from 'modules/stake-bnb/actions/getTxData';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

import { MainRouteParams } from '../../types';

interface IMainDataBSC {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  token: Token;
  error?: FetchBaseQueryError | Error;
  handleAddTokenToWallet: () => void;
}

function isTBnbSyntToken(token: Token): token is TBnbSyntToken {
  return AVAILABLE_BNB_SYNT_TOKENS.includes(token as TBnbSyntToken);
}

export function useMainDataBSC(): IMainDataBSC {
  const dispatch = useAppDispatch();
  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();
  const { token, txHash } = useParams<MainRouteParams>();
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
  const { data: stats, refetch } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const isPending = !receipt && !!data?.isPending;

  const onAddTokenClick = () => {
    if (!isTBnbSyntToken(token)) {
      return;
    }

    addBNBTokenToWallet(token);
  };

  useProviderEffect(() => {
    if (!stats) {
      refetch();
    }
  }, [dispatch, txHash]);

  return {
    token,
    isLoading,
    isPending,
    amount: data?.amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
}
