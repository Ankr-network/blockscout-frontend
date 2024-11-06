import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchPrivateStatsParams,
  selectPrivateStats,
  selectPrivateStatsLoading,
  selectPrivateStatsState,
  useFetchPrivateStatsQuery,
  useLazyFetchPrivateStatsQuery,
} from '../actions/fetchPrivateStats';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUsePrivateStats
  extends IUseQueryProps,
    IFetchPrivateStatsParams {}

export const usePrivateStats = ({
  group,
  interval,
  skipFetching,
}: IUsePrivateStats) => {
  const params = useMemo(
    (): IFetchPrivateStatsParams => ({ group, interval }),
    [group, interval],
  );

  useFetchPrivateStatsQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchPrivateStatsQuery();

  const handleFetchPrivateStats = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const privateStats = useAppSelector(state =>
    selectPrivateStats(state, params),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsLoading(state, params),
  );

  const state = useAppSelector(storeState =>
    selectPrivateStatsState(storeState, params),
  );

  return { handleFetchPrivateStats, loading, privateStats, state };
};
