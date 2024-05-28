import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchUSDTDepositFeeParams,
  useFetchUSDTDepositFeeQuery,
} from '../actions/fetchUSDTDepositFee';
import {
  selectUSDTDepositFee,
  selectUSDTDepositFeeFetching,
  selectUSDTDepositFeeLoading,
} from '../store/selectors';

export interface IUseUsdtAllowanceFeeProps extends IFetchUSDTDepositFeeParams {
  skipFetching?: boolean;
}

export const useUSDTDepositFee = ({
  skipFetching = false,
  ...queryParams
}: IUseUsdtAllowanceFeeProps) => {
  useFetchUSDTDepositFeeQuery(skipFetching ? skipToken : queryParams);

  const fee = useAppSelector(state => selectUSDTDepositFee(state, queryParams));
  const isFetching = useAppSelector(state =>
    selectUSDTDepositFeeFetching(state, queryParams),
  );
  const isLoading = useAppSelector(state =>
    selectUSDTDepositFeeLoading(state, queryParams),
  );

  return { fee, isFetching, isLoading };
};
