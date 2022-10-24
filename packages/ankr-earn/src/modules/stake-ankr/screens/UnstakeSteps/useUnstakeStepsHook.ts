import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { useGetTxDataQuery } from 'modules/stake-ankr/actions/getTxData';
import { useGetTxReceiptQuery } from 'modules/stake-ankr/actions/getTxReceipt';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

export interface IUnstakeStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  nodeProvider?: string;
  transactionId?: string;
  error?: FetchBaseQueryError;
}

interface IUnstakeStepsParams {
  txHash: string;
}

export const useUnstakeStepsHook = (): IUnstakeStepsHook => {
  const { txHash } = useParams<IUnstakeStepsParams>();

  const { isFetching: isLoading, data, error } = useGetTxDataQuery({ txHash });
  const { data: receipt } = useGetTxReceiptQuery({ txHash });
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
    amount: data?.amount,
    isLoading,
    isPending,
    error: error as FetchBaseQueryError,
    nodeProvider: providerName,
    transactionId: txHash,
  };
};
