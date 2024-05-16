import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchANKRDepositFeeParams,
  useFetchANKRDepositFeeQuery,
} from '../actions/fetchANKRDepositFee';
import {
  selectANKRDepositFee,
  selectANKRDepositFeeFetching,
  selectANKRDepositFeeLoading,
} from '../store/selectors';

export interface IUseAnkrAllowanceFeeProps extends IFetchANKRDepositFeeParams {
  skipFetching?: boolean;
}

export const useANKRDepositFee = ({
  skipFetching = false,
  ...params
}: IUseAnkrAllowanceFeeProps) => {
  useFetchANKRDepositFeeQuery(skipFetching ? skipToken : params);

  const { amount } = params;

  const fee = useAppSelector(state => selectANKRDepositFee(state, amount));
  const isFetching = useAppSelector(state =>
    selectANKRDepositFeeFetching(state, amount),
  );
  const isLoading = useAppSelector(state =>
    selectANKRDepositFeeLoading(state, amount),
  );

  return { fee, isFetching, isLoading };
};
