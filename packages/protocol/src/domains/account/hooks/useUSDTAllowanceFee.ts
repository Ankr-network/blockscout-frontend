import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchUSDTAllowanceFeeParams,
  useFetchUSDTAllowanceFeeQuery,
} from '../actions/fetchUSDTAllowanceFee';
import {
  selectUSDTAllowanceFee,
  selectUSDTAllowanceFeeFetching,
  selectUSDTAllowanceFeeLoading,
} from '../store/selectors';

export interface IUseUsdtAllowanceFeeProps
  extends IFetchUSDTAllowanceFeeParams {
  skipFetching?: boolean;
}

export const useUsdtAllowanceFee = ({
  skipFetching = false,
  ...queryParams
}: IUseUsdtAllowanceFeeProps) => {
  useFetchUSDTAllowanceFeeQuery(skipFetching ? skipToken : queryParams);

  const fee = useAppSelector(selectUSDTAllowanceFee);
  const isFetching = useAppSelector(selectUSDTAllowanceFeeFetching);
  const isLoading = useAppSelector(selectUSDTAllowanceFeeLoading);

  return { fee, isFetching, isLoading };
};
