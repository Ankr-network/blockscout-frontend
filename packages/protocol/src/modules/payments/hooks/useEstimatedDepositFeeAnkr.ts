import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IEstimateDepositFeeAnkrParams,
  selectEstimatedDepositFeeAnkr,
  selectEstimatedDepositFeeAnkrLoading,
  useEstimateDepositFeeAnkrQuery,
  useLazyEstimateDepositFeeAnkrQuery,
} from '../actions/estimateDepositFeeAnkr';

export interface IUseEstimatedDepositFeeAnkrProps
  extends IUseQueryProps,
    IEstimateDepositFeeAnkrParams {}

export const useEstimatedDepositFeeAnkr = ({
  skipFetching,
  txId,
}: IUseEstimatedDepositFeeAnkrProps) => {
  const params = useMemo(
    (): IEstimateDepositFeeAnkrParams => ({ txId }),
    [txId],
  );
  const { refetch: handleRefetchEstimatedDepositFeeAnkr } =
    useEstimateDepositFeeAnkrQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyEstimateDepositFeeAnkrQuery();

  const handleFetchEstimatedDepositFeeAnkr = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchEstimatedDepositFeeAnkrRef = useAutoupdatedRef(
    handleFetchEstimatedDepositFeeAnkr,
  );

  const depositFeeAnkr = useAppSelector(state =>
    selectEstimatedDepositFeeAnkr(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectEstimatedDepositFeeAnkrLoading(state, params),
  );

  return {
    depositFeeAnkr,
    fetchEstimatedDepositFeeAnkrRef,
    handleFetchEstimatedDepositFeeAnkr,
    handleRefetchEstimatedDepositFeeAnkr,
    isLoading,
  };
};
