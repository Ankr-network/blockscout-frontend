import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchNativeTokenPriceParams,
  selectNativeTokenPrice,
  selectNativeTokenPriceLoading,
  useFetchNativeTokenPriceQuery,
  useLazyFetchNativeTokenPriceQuery,
} from '../actions/fetchNativeTokenPrice';

export interface IUseNativeTokenPriceProps
  extends IUseQueryProps,
    IFetchNativeTokenPriceParams {}

export const useNativeTokenPrice = ({
  skipFetching,
  ...params
}: IUseNativeTokenPriceProps) => {
  const { refetch: handleRefetchNativeTokenPrice } =
    useFetchNativeTokenPriceQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchNativeTokenPriceQuery();

  const handleFetchNativeTokenPrice = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const price = useAppSelector(state => selectNativeTokenPrice(state, params));
  const isLoading = useAppSelector(state =>
    selectNativeTokenPriceLoading(state, params),
  );

  return {
    handleFetchNativeTokenPrice,
    handleRefetchNativeTokenPrice,
    isLoading,
    price,
  };
};
