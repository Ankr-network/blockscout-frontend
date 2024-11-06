import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchPrivateTotalStatsParams,
  selectPrivateTotalStats,
  selectPrivateTotalStatsLoading,
  selectPrivateTotalStatsState,
  useFetchPrivateTotalStatsQuery,
  useLazyFetchPrivateTotalStatsQuery,
} from '../actions/fetchPrivateTotalStats';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUsePrivateTotalStatsProps
  extends IFetchPrivateTotalStatsParams,
    IUseQueryProps {}

export const usePrivateTotalStats = ({
  group,
  skipFetching,
}: IUsePrivateTotalStatsProps) => {
  const params = useMemo(
    (): IFetchPrivateTotalStatsParams => ({ group }),
    [group],
  );

  useFetchPrivateTotalStatsQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchPrivateTotalStatsQuery();

  const handleFetchPrivateTotalStats = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const totalStats = useAppSelector(state =>
    selectPrivateTotalStats(state, params),
  );
  const loading = useAppSelector(state =>
    selectPrivateTotalStatsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectPrivateTotalStatsState(storeState, params),
  );

  return { handleFetchPrivateTotalStats, loading, state, totalStats };
};
