import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectGasPrice,
  selectGasPriceFetching,
  selectGasPriceLoading,
} from '../store/selectors';
import { useFetchGasPriceQuery } from '../actions/fetchGasPrice';

export interface IUseGasPriceProps {
  skipFetching?: boolean;
}

export const useGasPrice = ({ skipFetching }: IUseGasPriceProps) => {
  useFetchGasPriceQuery(skipFetching ? skipToken : undefined);

  const gasPrice = useAppSelector(selectGasPrice);
  const isFetching = useAppSelector(selectGasPriceFetching);
  const isLoading = useAppSelector(selectGasPriceLoading);

  return { isFetching, isLoading, gasPrice };
};
