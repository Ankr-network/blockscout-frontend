import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchBlockchainTxParams,
  selectBlockchainTx,
  selectBlockchainTxLoading,
  useFetchBlockchainTxQuery,
  useLazyFetchBlockchainTxQuery,
} from '../actions/fetchBlockchainTx';

export interface IUseBlockchainTxProps
  extends IUseQueryProps,
    IFetchBlockchainTxParams {}

export const useBlockchainTx = ({
  skipFetching,
  ...params
}: IUseBlockchainTxProps) => {
  const { refetch: handleRefetchBlockchainTx } = useFetchBlockchainTxQuery(
    getQueryParams({ skipFetching, params }),
  );

  const [fetchLazy] = useLazyFetchBlockchainTxQuery();

  const handleFetchBlockchainTx = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const blockchainTx = useAppSelector(state =>
    selectBlockchainTx(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectBlockchainTxLoading(state, params),
  );

  return {
    blockchainTx,
    handleFetchBlockchainTx,
    handleRefetchBlockchainTx,
    isLoading,
  };
};
