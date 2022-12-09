import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { useGetANKRTxDataQuery } from 'modules/stake-ankr/actions/getTxData';
import { useGetANKRTxReceiptQuery } from 'modules/stake-ankr/actions/getTxReceipt';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

export interface IClaimStepsHook {
  isLoading: boolean;
  isPending: boolean;
  nodeProvider?: string;
  transactionId?: string;
  error?: FetchBaseQueryError;
}

interface IClaimStepsParams {
  txHash: string;
}

export const useClaimStepsHook = (): IClaimStepsHook => {
  const { txHash } = useParams<IClaimStepsParams>();

  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetANKRTxDataQuery({ txHash });
  const { data: receipt } = useGetANKRTxReceiptQuery({ txHash });
  const { data: providers } = useGetProvidersQuery();

  const providerAddress = data?.provider.toUpperCase();
  const currentProvider = providers?.find(
    provider => provider.validator.toUpperCase() === providerAddress,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const isSuccessfulReceipt = receipt && receipt.status;
  const isPending = !!data?.isPending && !isSuccessfulReceipt;

  return {
    isLoading,
    isPending,
    error: error as FetchBaseQueryError,
    nodeProvider: providerName,
    transactionId: txHash,
  };
};
