import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IEstimateAllowanceFeeAnkrParams,
  selectEstimatedAllowanceFeeAnkr,
  selectEstimatedAllowanceFeeAnkrLoading,
  useEstimateAllowanceFeeAnkrQuery,
  useLazyEstimateAllowanceFeeAnkrQuery,
} from '../actions/estimateAllowanceFeeAnkr';

export interface IUseEstimatedAllowanceFeeAnkrProps
  extends IUseQueryProps,
    IEstimateAllowanceFeeAnkrParams {}

export const useEstimatedAllowanceFeeAnkr = ({
  skipFetching,
  txId,
}: IUseEstimatedAllowanceFeeAnkrProps) => {
  const params = useMemo(
    (): IEstimateAllowanceFeeAnkrParams => ({ txId }),
    [txId],
  );
  const { refetch: handleRefetchEstimatedAllowanceFeeAnkr } =
    useEstimateAllowanceFeeAnkrQuery(getQueryParams({ skipFetching, params }));

  const [fetchLazy] = useLazyEstimateAllowanceFeeAnkrQuery();

  const handleFetchEstimatedAllowanceFeeAnkr = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchEstimatedAllowanceFeeAnkrRef = useAutoupdatedRef(
    handleFetchEstimatedAllowanceFeeAnkr,
  );

  const allowanceFeeAnkr = useAppSelector(state =>
    selectEstimatedAllowanceFeeAnkr(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedAllowanceFeeAnkrLoading(state, params),
  );

  return {
    allowanceFeeAnkr,
    fetchEstimatedAllowanceFeeAnkrRef,
    handleFetchEstimatedAllowanceFeeAnkr,
    handleRefetchEstimatedAllowanceFeeAnkr,
    isLoading,
  };
};
