import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

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
  ...params
}: IUseEstimatedDepositFeeUsdtProps) => {
  const { refetch: handleRefetchEstimatedDepositFeeUsdt } =
    useEstimateDepositFeeUsdtQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyEstimateDepositFeeUsdtQuery();

  const handleFetchEstimatedDepositFeeUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const depositFee = useAppSelector(state =>
    selectEstimatedDepositFeeUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedDepositFeeUsdtLoading(state, params),
  );

  return {
    depositFee,
    handleFetchEstimatedDepositFeeUsdt,
    handleRefetchEstimatedDepositFeeUsdt,
    isLoading,
  };
};
