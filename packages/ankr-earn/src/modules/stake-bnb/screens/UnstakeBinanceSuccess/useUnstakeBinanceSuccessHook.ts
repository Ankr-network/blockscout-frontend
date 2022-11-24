import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import {
  getTxData,
  getTxReceipt,
  getUnstakeTxData,
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
  error?: Error;
  handleAddTokenToWallet: () => void;
}

interface IUnstakeSuccessParams {
  token: TBnbSyntToken;
  txHash: string;
}

export const useUnstakeBinanceSuccessHook = (): IUnstakeBinanceSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
  const {
    loading: isLoading,
    data,
    error,
  } = useQuery({ type: getUnstakeTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const { data: stats } = useQuery({ type: fetchStats });
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    dispatchRequest(getUnstakeTxData({ txHash }));
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
    dispatchRequest(addBNBTokenToWallet(token));
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
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
