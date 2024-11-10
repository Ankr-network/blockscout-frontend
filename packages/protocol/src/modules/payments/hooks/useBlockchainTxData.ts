import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchBlockchainTxDataParams,
  selectBlockchainTxData,
  selectBlockchainTxDataLoading,
  useFetchBlockchainTxDataQuery,
  useLazyFetchBlockchainTxDataQuery,
} from '../actions/fetchBlockchainTxData';

export interface IUseBlockchainTxDataProps
  extends IUseQueryProps,
    IFetchBlockchainTxDataParams {}

export const useBlockchainTxData = ({
  network,
  skipFetching,
  txHash,
}: IUseBlockchainTxDataProps) => {
  const params = useMemo(
    (): IFetchBlockchainTxDataParams => ({ network, txHash }),
    [network, txHash],
  );
  const { refetch: handleRefetchBlockchainTxData } =
    useFetchBlockchainTxDataQuery(getQueryParams({ skipFetching, params }));

  const [fetchLazy] = useLazyFetchBlockchainTxDataQuery();

  const handleFetchBlockchainTxData = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const blockchainTxData = useAppSelector(state =>
    selectBlockchainTxData(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectBlockchainTxDataLoading(state, params),
  );

  return {
    blockchainTxData,
    handleFetchBlockchainTxData,
    handleRefetchBlockchainTxData,
    isLoading,
  };
};
