import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getTxData } from 'modules/stake-ankr/actions/getTxData';
import { getTxReceipt } from 'modules/stake-ankr/actions/getTxReceipt';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IClaimStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  nodeProvider?: string;
  transactionId?: string;
  error?: Error;
}

interface IClaimStepsParams {
  txHash: string;
}

export const useClaimStepsHook = (): IClaimStepsHook => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();
  const { txHash } = useParams<IClaimStepsParams>();

  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const { data: providers } = useQuery({
    type: getProviders,
  });

  const providerAddress = data?.provider.toUpperCase();
  const currentProvider = providers?.find(
    provider => provider.validator.toUpperCase() === providerAddress,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const isPending = !receipt && !!data?.isPending;

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash }));
    dispatchRequest(getTxReceipt({ txHash }));
    dispatchRequest(getProviders());

    return () => {
      dispatch(resetRequests([getTxData.toString(), getTxReceipt.toString()]));
    };
  }, [dispatch, txHash]);

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, receipt]);

  return {
    amount: data?.amount,
    isLoading,
    isPending,
    error: error || txFailError,
    nodeProvider: providerName,
    transactionId: txHash,
  };
};
