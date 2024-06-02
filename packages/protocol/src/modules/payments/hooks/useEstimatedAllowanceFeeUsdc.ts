import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IEstimateAllowanceFeeUsdcParams,
  selectEstimatedAllowanceFeeUsdc,
  selectEstimatedAllowanceFeeUsdcLoading,
  useEstimateAllowanceFeeUsdcQuery,
  useLazyEstimateAllowanceFeeUsdcQuery,
} from '../actions/estimateAllowanceFeeUsdc';

export interface IUseEstimatedAllowanceFeeUsdcProps
  extends IUseQueryProps,
    IEstimateAllowanceFeeUsdcParams {}

export const useEstimatedAllowanceFeeUsdc = ({
  skipFetching,
  ...params
}: IUseEstimatedAllowanceFeeUsdcProps) => {
  const { refetch: handleRefetchEstimatedAllowanceFeeUsdc } =
    useEstimateAllowanceFeeUsdcQuery(getQueryParams({ skipFetching, params }));

  const [fetchLazy] = useLazyEstimateAllowanceFeeUsdcQuery();

  const handleFetchEstimatedAllowanceFeeUsdc = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const allowanceFeeUsdc = useAppSelector(state =>
    selectEstimatedAllowanceFeeUsdc(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedAllowanceFeeUsdcLoading(state, params),
  );

  return {
    allowanceFeeUsdc,
    handleFetchEstimatedAllowanceFeeUsdc,
    handleRefetchEstimatedAllowanceFeeUsdc,
    isLoading,
  };
};
