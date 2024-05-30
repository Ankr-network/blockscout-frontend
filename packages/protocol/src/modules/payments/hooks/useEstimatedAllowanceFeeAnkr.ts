import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

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
  ...params
}: IUseEstimatedAllowanceFeeAnkrProps) => {
  const { refetch: handleRefetchEstimatedAllowanceFeeAnkr } =
    useEstimateAllowanceFeeAnkrQuery(getQueryParams({ skipFetching, params }));

  const [fetchLazy] = useLazyEstimateAllowanceFeeAnkrQuery();

  const handleFetchEstimatedAllowanceFeeAnkr = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const allowanceFee = useAppSelector(state =>
    selectEstimatedAllowanceFeeAnkr(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedAllowanceFeeAnkrLoading(state, params),
  );

  return {
    allowanceFee,
    handleFetchEstimatedAllowanceFeeAnkr,
    handleRefetchEstimatedAllowanceFeeAnkr,
    isLoading,
  };
};
