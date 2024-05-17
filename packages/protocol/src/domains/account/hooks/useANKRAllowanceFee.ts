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
  ...params
}: IUseAnkrAllowanceFeeProps) => {
  useFetchANKRAllowanceFeeQuery(skipFetching ? skipToken : params);

  const { amount } = params;

  const fee = useAppSelector(state => selectANKRAllowanceFee(state, amount));
  const isFetching = useAppSelector(state =>
    selectANKRAllowanceFeeFetching(state, amount),
  );
  const isLoading = useAppSelector(state =>
    selectANKRAllowanceFeeLoading(state, amount),
  );

  return { fee, isFetching, isLoading };
};
