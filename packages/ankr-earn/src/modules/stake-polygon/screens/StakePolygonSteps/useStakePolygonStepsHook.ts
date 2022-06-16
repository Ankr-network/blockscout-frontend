import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { addMATICTokenToWallet } from 'modules/stake-polygon/actions/addMATICTokenToWallet';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import {
  getTxData,
  getTxReceipt,
} from 'modules/stake-polygon/actions/getTxData';
import { TMaticSyntToken } from 'modules/stake-polygon/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeMaticStepsHook {
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
  tokenOut: TMaticSyntToken;
  txHash: string;
}

export const useStakePolygonStepsHook = (): IStakeMaticStepsHook => {
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
    dispatchRequest(addMATICTokenToWallet(tokenOut));
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
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
