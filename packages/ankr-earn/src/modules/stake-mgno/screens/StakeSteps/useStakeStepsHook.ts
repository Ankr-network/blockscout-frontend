import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getProviderAddresses } from 'modules/stake-mgno/actions/getProviderAddresses';
import { getProviderStats } from 'modules/stake-mgno/actions/getProviderStats';
import { getTxData } from 'modules/stake-mgno/actions/getTxData';
import { getTxReceipt } from 'modules/stake-mgno/actions/getTxReceipt';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  nodeProvider?: string;
  transactionId?: string;
  error?: Error;
}

interface IStakeStepsParams {
  txHash: string;
}

export const useStakeStepsHook = (): IStakeStepsHook => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();
  const { txHash } = useParams<IStakeStepsParams>();

  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const { data: providerStats } = useQuery({
    type: getProviderStats,
  });

  const isSuccessfulReceipt = receipt && receipt.status;
  const isPending = !!data?.isPending && !isSuccessfulReceipt;

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash })).then(() => {
      dispatchRequest(getTxReceipt({ txHash }));
      dispatchRequest(getProviderAddresses());
    });

    return () => {
      dispatch(resetRequests([getTxData.toString(), getTxReceipt.toString()]));
    };
  }, [dispatch, txHash]);

  useEffect(() => {
    if (isSuccessfulReceipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, isSuccessfulReceipt]);

  return {
    amount: data?.amount,
    isLoading,
    isPending,
    error,
    nodeProvider: providerStats?.provider.name,
    transactionId: txHash,
  };
};
