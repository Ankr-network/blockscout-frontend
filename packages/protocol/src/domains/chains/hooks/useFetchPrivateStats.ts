import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  FetchPrivateStatsParams,
  selectPrivateStats,
  selectPrivateStatsLoading,
  selectPrivateStatsState,
  useFetchPrivateStatsQuery,
  useLazyFetchPrivateStatsQuery,
} from '../actions/private/fetchPrivateStats';

export interface IUseFetchPrivateStatsProps
  extends IUseQueryProps,
    FetchPrivateStatsParams {}

export const useFetchPrivateStats = ({
  gateway,
  group,
  interval,
  skipFetching,
  userEndpointToken,
}: IUseFetchPrivateStatsProps) => {
  const params = useMemo(
    (): FetchPrivateStatsParams => ({
      gateway,
      group,
      interval,
      userEndpointToken,
    }),
    [gateway, group, interval, userEndpointToken],
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
  const isLoading = useAppSelector(state =>
    selectPrivateStatsLoading(state, params),
  );
  const { error } = useAppSelector(state =>
    selectPrivateStatsState(state, params),
  );

  return { error, handleFetchPrivateStats, isLoading, privateStats };
};
