import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchBlockchainTxReceiptParams,
  selectBlockchainTxReceipt,
  selectBlockchainTxReceiptLoading,
  useFetchBlockchainTxReceiptQuery,
  useLazyFetchBlockchainTxReceiptQuery,
} from '../actions/fetchBlockchainTxReceipt';

export interface IUseBlockchainTxReceiptProps
  extends IUseQueryProps,
    IFetchBlockchainTxReceiptParams {}

export const useBlockchainTxReceipt = ({
  network,
  skipFetching,
  txHash,
}: IUseBlockchainTxReceiptProps) => {
  const params = useMemo(
    (): IFetchBlockchainTxReceiptParams => ({ network, txHash }),
    [network, txHash],
  );
  const { refetch: handleRefetchTxReceipt } = useFetchBlockchainTxReceiptQuery(
    getQueryParams({ skipFetching, params }),
  );

  const [fetchLazy] = useLazyFetchBlockchainTxReceiptQuery();

  const handleFetchBlockchainTxReceipt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const txReceipt = useAppSelector(state =>
    selectBlockchainTxReceipt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectBlockchainTxReceiptLoading(state, params),
  );

  return {
    handleFetchBlockchainTxReceipt,
    handleRefetchTxReceipt,
    isLoading,
    txReceipt,
  };
};
