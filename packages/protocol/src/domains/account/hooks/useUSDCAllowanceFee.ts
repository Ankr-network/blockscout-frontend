import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchUSDCAllowanceFeeParams,
  useFetchUSDCAllowanceFeeQuery,
} from '../actions/fetchUSDCAllowanceFee';
import {
  selectUSDCAllowanceFee,
  selectUSDCAllowanceFeeFetching,
  selectUSDCAllowanceFeeLoading,
} from '../store/selectors';

export interface IUseUsdcAllowanceFeeProps
  extends IFetchUSDCAllowanceFeeParams {
  skipFetching?: boolean;
}

export const useUsdcAllowanceFee = ({
  skipFetching = false,
  ...queryParams
}: IUseUsdcAllowanceFeeProps) => {
  useFetchUSDCAllowanceFeeQuery(skipFetching ? skipToken : queryParams);

  const fee = useAppSelector(state =>
    selectUSDCAllowanceFee(state, queryParams),
  );
  const isFetching = useAppSelector(state =>
    selectUSDCAllowanceFeeFetching(state, queryParams),
  );
  const isLoading = useAppSelector(state =>
    selectUSDCAllowanceFeeLoading(state, queryParams),
  );

  return { fee, isFetching, isLoading };
};
