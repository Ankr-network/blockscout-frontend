import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

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
  txId,
}: IUseEstimatedAllowanceFeeUsdtProps) => {
  const params = useMemo(
    (): IEstimateAllowanceFeeUsdtParams => ({ txId }),
    [txId],
  );
  const { refetch: handleRefetchEstimatedAllowanceFeeUsdt } =
    useEstimateAllowanceFeeUsdtQuery(getQueryParams({ skipFetching, params }));

  const [fetchLazy] = useLazyEstimateAllowanceFeeUsdtQuery();

  const handleFetchEstimatedAllowanceFeeUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchEstimatedAllowanceFeeUsdtRef = useAutoupdatedRef(
    handleFetchEstimatedAllowanceFeeUsdt,
  );

  const allowanceFeeUsdt = useAppSelector(state =>
    selectEstimatedAllowanceFeeUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedAllowanceFeeUsdtLoading(state, params),
  );

  return {
    allowanceFeeUsdt,
    fetchEstimatedAllowanceFeeUsdtRef,
    handleFetchEstimatedAllowanceFeeUsdt,
    handleRefetchEstimatedAllowanceFeeUsdt,
    isLoading,
  };
};
