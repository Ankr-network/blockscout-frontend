import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

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
  network,
  requestId,
  skipFetching,
}: IUseNativeTokenPriceProps) => {
  const params = useMemo(
    (): IFetchNativeTokenPriceParams => ({ network, requestId }),
    [network, requestId],
  );
  const { refetch: handleRefetchNativeTokenPrice } =
    useFetchNativeTokenPriceQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchNativeTokenPriceQuery();

  const handleFetchNativeTokenPrice = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchNativeTokenPriceRef = useAutoupdatedRef(
    handleFetchNativeTokenPrice,
  );

  const price = useAppSelector(state => selectNativeTokenPrice(state, params));
  const isLoading = useAppSelector(state =>
    selectNativeTokenPriceLoading(state, params),
  );

  return {
    fetchNativeTokenPriceRef,
    handleFetchNativeTokenPrice,
    handleRefetchNativeTokenPrice,
    isLoading,
    price,
  };
};
