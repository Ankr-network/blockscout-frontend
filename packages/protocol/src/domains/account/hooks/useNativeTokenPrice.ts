import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectNativeTokenPrice,
  selectNativeTokenPriceFetching,
  selectNativeTokenPriceLoading,
} from '../store/selectors';
import {
  IFetchNativeTokenPriceParams,
  useFetchNativeTokenPriceQuery,
} from '../actions/fetchNativeTokenPrice';

export interface IUseNativeTokenPriceParams
  extends IFetchNativeTokenPriceParams {
  skipFetching?: boolean;
}

export const useNativeTokenPrice = ({
  network,
  skipFetching = false,
}: IUseNativeTokenPriceParams) => {
  useFetchNativeTokenPriceQuery(skipFetching ? skipToken : { network });

  const price = useAppSelector(selectNativeTokenPrice);
  const isLoading = useAppSelector(selectNativeTokenPriceLoading);
  const isFetching = useAppSelector(selectNativeTokenPriceFetching);

  return { isFetching, isLoading, price };
};
