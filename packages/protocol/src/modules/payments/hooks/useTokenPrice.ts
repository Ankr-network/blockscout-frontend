import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchTokenPriceParams,
  selectTokenPrice,
  selectTokenPriceLoading,
  useFetchTokenPriceQuery,
  useLazyFetchTokenPriceQuery,
} from '../actions/fetchTokenPrice';

export interface IUseTokenPriceProps
  extends IUseQueryProps,
    IFetchTokenPriceParams {}

export const useTokenPrice = ({
  skipFetching,
  ...params
}: IUseTokenPriceProps) => {
  const { refetch: handleRefetchTokenPrice } = useFetchTokenPriceQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchTokenPriceQuery();

  const handleFetchTokenPrice = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const price = useAppSelector(state => selectTokenPrice(state, params));
  const isLoading = useAppSelector(state =>
    selectTokenPriceLoading(state, params),
  );

  return { handleFetchTokenPrice, handleRefetchTokenPrice, isLoading, price };
};
