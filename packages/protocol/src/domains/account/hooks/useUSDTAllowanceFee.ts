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

  const fee = useAppSelector(state =>
    selectUSDTAllowanceFee(state, queryParams),
  );
  const isFetching = useAppSelector(state =>
    selectUSDTAllowanceFeeFetching(state, queryParams),
  );
  const isLoading = useAppSelector(state =>
    selectUSDTAllowanceFeeLoading(state, queryParams),
  );

  return { fee, isFetching, isLoading };
};
