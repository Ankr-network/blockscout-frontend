import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchANKRAllowanceFeeParams,
  useFetchANKRAllowanceFeeQuery,
} from '../actions/fetchANKRAllowanceFee';
import {
  selectANKRAllowanceFee,
  selectANKRAllowanceFeeFetching,
  selectANKRAllowanceFeeLoading,
} from '../store/selectors';

export interface IUseAnkrAllowanceFeeProps
  extends IFetchANKRAllowanceFeeParams {
  skipFetching?: boolean;
}

export const useAnkrAllowanceFee = ({
  skipFetching = false,
  ...queryParams
}: IUseAnkrAllowanceFeeProps) => {
  useFetchANKRAllowanceFeeQuery(skipFetching ? skipToken : queryParams);

  const fee = useAppSelector(selectANKRAllowanceFee);
  const isFetching = useAppSelector(selectANKRAllowanceFeeFetching);
  const isLoading = useAppSelector(selectANKRAllowanceFeeLoading);

  return { fee, isFetching, isLoading };
};
