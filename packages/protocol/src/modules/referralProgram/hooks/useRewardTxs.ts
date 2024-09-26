import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchRewardTxsParams,
  selectRewardTxs,
  selectRewardTxsLoading,
  useFetchRewardTxsQuery,
  useLazyFetchRewardTxsQuery,
} from '../actions/fetchRewardTxs';

export interface IUseRewardTxsProps
  extends IUseQueryProps,
    IFetchRewardTxsParams {}

export const useRewardTxs = ({
  group,
  period,
  skipFetching = false,
  to,
}: IUseRewardTxsProps = {}) => {
  const params = useMemo(
    (): IFetchRewardTxsParams => ({ group, period, to }),
    [group, period, to],
  );

  useFetchRewardTxsQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchRewardTxsQuery();

  const handleFetchRewardTxs = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const rewardTxs = useAppSelector(state => selectRewardTxs(state, params));

  const isLoading = useAppSelector(state =>
    selectRewardTxsLoading(state, params),
  );
  const isLoaded = rewardTxs.length > 0;

  return { handleFetchRewardTxs, isLoaded, isLoading, rewardTxs };
};
