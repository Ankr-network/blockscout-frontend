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
  ...queryParams
}: IUseAnkrAllowanceFeeProps) => {
  useFetchANKRDepositFeeQuery(skipFetching ? skipToken : queryParams);

  const fee = useAppSelector(selectANKRDepositFee);
  const isFetching = useAppSelector(selectANKRDepositFeeFetching);
  const isLoading = useAppSelector(selectANKRDepositFeeLoading);

  return { fee, isFetching, isLoading };
};
