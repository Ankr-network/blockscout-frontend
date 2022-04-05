import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { getTxData, getTxReceipt } from 'modules/stake-bnb/actions/getTxData';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeBinanceStepsHook {
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
  tokenOut: TBnbSyntToken;
  txHash: string;
}

export const useStakeBinanceStepsHook = (): IStakeBinanceStepsHook => {
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
    dispatchRequest(addBNBTokenToWallet(tokenOut));
  };

  const amount = getAmount(stats?.aBNBcRatio, data?.amount);

  return {
    amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: tokenOut,
    isLoading,
    isPending: !receipt,
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};

function getAmount(
  ratio?: BigNumber,
  value?: BigNumber,
): BigNumber | undefined {
  if (!value) {
    return undefined;
  }

  if (ratio) {
    return value.multipliedBy(ratio);
  }

  return value;
}
