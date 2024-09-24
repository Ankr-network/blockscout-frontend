import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchRewardBalanceParams,
  selectRewardBalance,
  selectRewardBalanceLoading,
  useFetchRewardBalanceQuery,
  useLazyFetchRewardBalanceQuery,
} from '../actions/fetchRewardBalance';

export interface IUseRewardBalanceProps
  extends IUseQueryProps,
    IFetchRewardBalanceParams {}

export const useRewardBalance = ({
  group,
  skipFetching = false,
}: IUseRewardBalanceProps = {}) => {
  const params = useMemo((): IFetchRewardBalanceParams => ({ group }), [group]);

  useFetchRewardBalanceQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchRewardBalanceQuery();

  const handleFetchRewardBalance = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const rewardBalance = useAppSelector(state =>
    selectRewardBalance(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectRewardBalanceLoading(state, params),
  );

  return { handleFetchRewardBalance, isLoading, rewardBalance };
};
