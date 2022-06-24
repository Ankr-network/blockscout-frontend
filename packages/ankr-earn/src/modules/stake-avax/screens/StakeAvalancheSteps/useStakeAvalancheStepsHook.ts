import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { addAVAXTokenToWallet } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { fetchStats } from 'modules/stake-avax/actions/fetchStats';
import { getTxData, getTxReceipt } from 'modules/stake-avax/actions/getTxData';
import { TAvaxSyntToken } from 'modules/stake-avax/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeAvalancheStepsHook {
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
  tokenOut: TAvaxSyntToken;
  txHash: string;
}

export const useStakeAvalancheStepsHook = (): IStakeAvalancheStepsHook => {
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();
  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const { data: stats } = useQuery({ type: fetchStats });
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash }));
    dispatchRequest(getTxReceipt({ txHash }));

    if (!stats) {
      dispatchRequest(fetchStats());
    }

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
    dispatchRequest(addAVAXTokenToWallet(tokenOut));
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
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
