import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectRates,
  selectRatesFetching,
  selectRatesLoading,
} from 'domains/account/store/selectors';

import { useFetchRatesQuery } from '../actions/rate/fetchRates';

export interface IUseRatesProps {
  skipFetching?: boolean;
}

export const useRates = ({
  skipFetching = false,
}: IUseRatesProps | void = {}) => {
  useFetchRatesQuery(skipFetching ? skipToken : undefined);

  const rates = useAppSelector(selectRates);
  const isLoading = useAppSelector(selectRatesLoading);
  const isFetching = useAppSelector(selectRatesFetching);

  return { isLoading, isFetching, rates };
};
