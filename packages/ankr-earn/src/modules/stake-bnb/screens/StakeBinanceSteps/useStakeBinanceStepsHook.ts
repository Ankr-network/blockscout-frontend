import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import {
  useGetBNBTxDataQuery,
  useGetBNBTxReceiptQuery,
} from 'modules/stake-bnb/actions/getTxData';
import { TBnbSyntToken } from 'modules/stake-bnb/types';

const DEFAULT_POLLING_INTERVAL = 3_000;
const ZERO_POLLING_INTERVAL = 0;

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
  const [pollingInterval, setPollingInterval] = useState(
    DEFAULT_POLLING_INTERVAL,
  );
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();

  const {
    isFetching: isLoading,
    data: bnbTxnData,
    error,
  } = useGetBNBTxDataQuery({ txHash });

  const { data: receipt } = useGetBNBTxReceiptQuery(
    { txHash },
    { pollingInterval },
  );

  const { data: stats, refetch: getBNBStats } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = () => {
    addBNBTokenToWallet(tokenOut);
  };

  const calculatedAmount = useMemo(() => {
    const isAnkrBNB = tokenOut === Token.aBNBc;
    if (isAnkrBNB) {
      return new BigNumber(receipt?.certAmount ?? ZERO);
    }

    const amount = bnbTxnData?.amount;
    const relayerFee = stats?.relayerFee;

    if (!amount || !relayerFee) {
      return undefined;
    }

    const amountWithoutFee = amount.minus(relayerFee);

    return amountWithoutFee;
  }, [bnbTxnData?.amount, receipt, stats, tokenOut]);

  const isPending = !receipt && !!bnbTxnData?.isPending;

  useProviderEffect(() => {
    if (receipt) {
      setPollingInterval(ZERO_POLLING_INTERVAL);
    }
  }, [receipt]);

  useProviderEffect(() => {
    if (!stats) {
      getBNBStats();
    }
  }, [stats]);

  return {
    amount: calculatedAmount,
    destination: bnbTxnData?.destinationAddress,
    transactionId: txHash,
    tokenName: tokenOut,
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
