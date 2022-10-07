import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { addAVAXTokenToWallet } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { fetchStats } from 'modules/stake-avax/actions/fetchStats';
import { getTxData, getTxReceipt } from 'modules/stake-avax/actions/getTxData';
import { TAvaxSyntToken } from 'modules/stake-avax/types';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IUnstakeAvalancheSuccessHook {
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
  token: TAvaxSyntToken;
  txHash: string;
}

export const useUnstakeAvalancheSuccess = (): IUnstakeAvalancheSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
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
    dispatchRequest(addAVAXTokenToWallet(token));
  };

  const amount = data?.amount ?? ZERO;

  const isPending = !receipt && !!data?.isPending;

  return {
    amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: token,
    isLoading,
    isPending,
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
