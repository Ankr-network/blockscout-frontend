import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchTxReceiptParams,
  selectTxReceipt,
  selectTxReceiptLoading,
  useFetchTxReceiptQuery,
  useLazyFetchTxReceiptQuery,
} from '../actions/fetchTxReceipt';

export interface IUseTxReceiptProps
  extends IUseQueryProps,
    IFetchTxReceiptParams {}

export const useTxReceipt = ({
  skipFetching,
  ...params
}: IUseTxReceiptProps) => {
  const { refetch: handleRefetchTxReceipt } = useFetchTxReceiptQuery(
    getQueryParams({ skipFetching, params }),
  );

  const [fetchLazy] = useLazyFetchTxReceiptQuery();

  const handleFetchTxReceipt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const txReceipt = useAppSelector(state => selectTxReceipt(state, params));

  const isLoading = useAppSelector(state =>
    selectTxReceiptLoading(state, params),
  );

  return { handleFetchTxReceipt, handleRefetchTxReceipt, isLoading, txReceipt };
};
