import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchUSDCDepositFeeParams,
  useFetchUSDCDepositFeeQuery,
} from '../actions/fetchUSDCDepositFee';
import {
  selectUSDCDepositFee,
  selectUSDCDepositFeeFetching,
  selectUSDCDepositFeeLoading,
} from '../store/selectors';

export interface IUseUsdtAllowanceFeeProps extends IFetchUSDCDepositFeeParams {
  skipFetching?: boolean;
}

export const useUSDCDepositFee = ({
  skipFetching = false,
  ...queryParams
}: IUseUsdtAllowanceFeeProps) => {
  useFetchUSDCDepositFeeQuery(skipFetching ? skipToken : queryParams);

  const fee = useAppSelector(selectUSDCDepositFee);
  const isFetching = useAppSelector(selectUSDCDepositFeeFetching);
  const isLoading = useAppSelector(selectUSDCDepositFeeLoading);

  return { fee, isFetching, isLoading };
};
