import { IGetCryptoPaymentOptionsParams } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectPaymentOptions,
  selectPaymentOptionsLoading,
  useFetchPaymentOptionsQuery,
  useLazyFetchPaymentOptionsQuery,
} from '../actions/fetchPaymentOptions';

export interface IUsePaymentOptionsProps
  extends IUseQueryProps,
    IGetCryptoPaymentOptionsParams {}

export const usePaymentOptions = ({
  active,
  skipFetching,
}: IUsePaymentOptionsProps | void = {}) => {
  const params = useMemo(
    (): IGetCryptoPaymentOptionsParams => ({ active }),
    [active],
  );
  const { refetch: handleRefetchPaymentOptions } = useFetchPaymentOptionsQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchPaymentOptionsQuery();

  const handleFetchPaymentOptions = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const paymentOptions = useAppSelector(selectPaymentOptions);
  const isLoading = useAppSelector(selectPaymentOptionsLoading);

  return {
    handleFetchPaymentOptions,
    handleRefetchPaymentOptions,
    isLoading,
    paymentOptions,
  };
};
