import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IEstimateAllowanceFeeUsdtParams,
  selectEstimatedAllowanceFeeUsdt,
  selectEstimatedAllowanceFeeUsdtLoading,
  useEstimateAllowanceFeeUsdtQuery,
  useLazyEstimateAllowanceFeeUsdtQuery,
} from '../actions/estimateAllowanceFeeUsdt';

export interface IUseEstimatedAllowanceFeeUsdtProps
  extends IUseQueryProps,
    IEstimateAllowanceFeeUsdtParams {}

export const useEstimatedAllowanceFeeUsdt = ({
  skipFetching,
  ...params
}: IUseEstimatedAllowanceFeeUsdtProps) => {
  const { refetch: handleRefetchEstimatedAllowanceFeeUsdt } =
    useEstimateAllowanceFeeUsdtQuery(getQueryParams({ skipFetching, params }));

  const [fetchLazy] = useLazyEstimateAllowanceFeeUsdtQuery();

  const handleFetchEstimatedAllowanceFeeUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const allowanceFeeUsdt = useAppSelector(state =>
    selectEstimatedAllowanceFeeUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedAllowanceFeeUsdtLoading(state, params),
  );

  return {
    allowanceFeeUsdt,
    handleFetchEstimatedAllowanceFeeUsdt,
    handleRefetchEstimatedAllowanceFeeUsdt,
    isLoading,
  };
};
