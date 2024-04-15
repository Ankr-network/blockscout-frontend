import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchTokenPriceParams,
  useFetchTokenPriceQuery,
} from '../actions/fetchTokenPrice';
import {
  selectTokenPrice,
  selectTokenPriceFetching,
  selectTokenPriceLoading,
} from '../store/selectors';

export interface IUseTokenPriceParams extends IFetchTokenPriceParams {
  skipFetching?: boolean;
}

export const useTokenPrice = ({
  skipFetching,
  ...queryParams
}: IUseTokenPriceParams | void = {}) => {
  useFetchTokenPriceQuery(skipFetching ? skipToken : queryParams);

  const price = useAppSelector(selectTokenPrice);
  const isLoading = useAppSelector(selectTokenPriceLoading);
  const isFetching = useAppSelector(selectTokenPriceFetching);

  return { isFetching, isLoading, price };
};
