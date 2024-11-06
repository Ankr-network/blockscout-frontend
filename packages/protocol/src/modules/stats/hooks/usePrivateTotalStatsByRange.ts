import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchPrivateTotalStatsByRangeParams,
  selectPrivateTotalStatsByRange,
  selectPrivateTotalStatsByRangeLoading,
  selectPrivateTotalStatsByRangeState,
  useFetchPrivateTotalStatsByRangeQuery,
  useLazyFetchPrivateTotalStatsByRangeQuery,
} from '../actions/fetchPrivateTotalStatsByRange';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUsePrivateTotalStatsByRangeProps
  extends IFetchPrivateTotalStatsByRangeParams,
    IUseQueryProps {}

export const usePrivateTotalStatsByRange = ({
  duration,
  from,
  group,
  monthly,
  skipFetching,
  timeframe,
  to,
  token,
}: IUsePrivateTotalStatsByRangeProps) => {
  const params = useMemo(
    (): IFetchPrivateTotalStatsByRangeParams => ({
      duration,
      from,
      group,
      monthly,
      timeframe,
      to,
      token,
    }),
    [duration, from, group, monthly, timeframe, to, token],
  );

  useFetchPrivateTotalStatsByRangeQuery(
    getQueryParams({ params, skipFetching }),
    {
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
    },
  );

  const [fetchLazy] = useLazyFetchPrivateTotalStatsByRangeQuery();

  const handleFetchPrivateTotalStatsByRange = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const totalStatsByRange = useAppSelector(state =>
    selectPrivateTotalStatsByRange(state, params),
  );
  const loading = useAppSelector(state =>
    selectPrivateTotalStatsByRangeLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectPrivateTotalStatsByRangeState(storeState, params),
  );

  return {
    handleFetchPrivateTotalStatsByRange,
    loading,
    state,
    totalStatsByRange,
  };
};
