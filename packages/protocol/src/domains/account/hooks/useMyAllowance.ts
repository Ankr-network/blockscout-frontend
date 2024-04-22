import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectMyAllowance,
  selectMyAllowanceLoading,
} from '../store/selectors';
import {
  useFetchMyAllowanceQuery,
  useLazyFetchMyAllowanceQuery,
} from '../actions/fetchMyAllowance';

export interface IUseMyAllowanceProps {
  skipFetching?: boolean;
}

export const useMyAllowance = ({
  skipFetching = false,
}: IUseMyAllowanceProps | void = {}) => {
  useFetchMyAllowanceQuery(skipFetching ? skipToken : undefined);

  const [fetchMyAllowance] = useLazyFetchMyAllowanceQuery();

  const myAllowance = useAppSelector(selectMyAllowance);
  const isLoading = useAppSelector(selectMyAllowanceLoading);

  return { fetchMyAllowance, isLoading, myAllowance };
};
