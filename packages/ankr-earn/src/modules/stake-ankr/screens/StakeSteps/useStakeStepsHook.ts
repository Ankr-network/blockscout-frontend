import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { useGetANKRTxDataQuery } from 'modules/stake-ankr/actions/getTxData';
import { useGetANKRTxReceiptQuery } from 'modules/stake-ankr/actions/getTxReceipt';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

export interface IStakeStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  nodeProvider?: string;
  transactionId?: string;
  error?: FetchBaseQueryError;
}

interface IStakeStepsParams {
  txHash: string;
}

export const useStakeStepsHook = (): IStakeStepsHook => {
  const { txHash } = useParams<IStakeStepsParams>();

  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetANKRTxDataQuery({ txHash });

  // TODO: try to handle skip polling when data exists
  const { data: receipt } = useGetANKRTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );

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
