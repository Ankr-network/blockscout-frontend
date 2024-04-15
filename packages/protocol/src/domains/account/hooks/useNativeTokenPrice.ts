import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectNativeTokenPrice,
  selectNativeTokenPriceFetching,
  selectNativeTokenPriceLoading,
} from '../store/selectors';
import { useFetchNativeTokenPriceQuery } from '../actions/fetchNativeTokenPrice';

export interface IUseNativeTokenPriceParams {
  skipFetching?: boolean;
}

export const useNativeTokenPrice = ({
  skipFetching = false,
}: IUseNativeTokenPriceParams | void = {}) => {
  useFetchNativeTokenPriceQuery(skipFetching ? skipToken : undefined);

  const price = useAppSelector(selectNativeTokenPrice);
  const isLoading = useAppSelector(selectNativeTokenPriceLoading);
  const isFetching = useAppSelector(selectNativeTokenPriceFetching);

  return { isFetching, isLoading, price };
};
