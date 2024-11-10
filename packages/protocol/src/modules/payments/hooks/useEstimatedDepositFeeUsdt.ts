import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IEstimateDepositFeeUsdtParams,
  selectEstimatedDepositFeeUsdt,
  selectEstimatedDepositFeeUsdtLoading,
  useEstimateDepositFeeUsdtQuery,
  useLazyEstimateDepositFeeUsdtQuery,
} from '../actions/estimateDepositFeeUsdt';

export interface IUseEstimatedDepositFeeUsdtProps
  extends IUseQueryProps,
    IEstimateDepositFeeUsdtParams {}

export const useEstimatedDepositFeeUsdt = ({
  skipFetching,
  txId,
}: IUseEstimatedDepositFeeUsdtProps) => {
  const params = useMemo(
    (): IEstimateDepositFeeUsdtParams => ({ txId }),
    [txId],
  );

  const { refetch: handleRefetchEstimatedDepositFeeUsdt } =
    useEstimateDepositFeeUsdtQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyEstimateDepositFeeUsdtQuery();

  const handleFetchEstimatedDepositFeeUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchEstimatedDepositFeeUsdtRef = useAutoupdatedRef(
    handleFetchEstimatedDepositFeeUsdt,
  );

  const depositFeeUsdt = useAppSelector(state =>
    selectEstimatedDepositFeeUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedDepositFeeUsdtLoading(state, params),
  );

  return {
    depositFeeUsdt,
    fetchEstimatedDepositFeeUsdtRef,
    handleFetchEstimatedDepositFeeUsdt,
    handleRefetchEstimatedDepositFeeUsdt,
    isLoading,
  };
};
