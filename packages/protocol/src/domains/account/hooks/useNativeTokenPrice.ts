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

  const price = useAppSelector(state => selectNativeTokenPrice(state, network));
  const isLoading = useAppSelector(state =>
    selectNativeTokenPriceLoading(state, network),
  );
  const isFetching = useAppSelector(state =>
    selectNativeTokenPriceFetching(state, network),
  );

  return { isFetching, isLoading, price };
};
