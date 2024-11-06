import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/stats/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectsStatsParams,
  selectProjectsStatsLoading,
  selectProjectsStatsState,
  useFetchProjectsStatsQuery,
  useLazyFetchProjectsStatsQuery,
} from '../actions/fetchProjectsStats';

export interface IUseProjectsStats
  extends IUseQueryProps,
    IFetchProjectsStatsParams {}

export const useProjectsStats = ({
  group,
  interval,
  skipFetching,
  tokens,
}: IUseProjectsStats) => {
  const params = useMemo(
    (): IFetchProjectsStatsParams => ({ group, interval, tokens }),
    [group, interval, tokens],
  );

  useFetchProjectsStatsQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchProjectsStatsQuery();

  const handleFetchProjectsStats = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const loading = useAppSelector(state =>
    selectProjectsStatsLoading(state, params),
  );

  const state = useAppSelector(storeState =>
    selectProjectsStatsState(storeState, params),
  );

  return { handleFetchProjectsStats, loading, state };
};
