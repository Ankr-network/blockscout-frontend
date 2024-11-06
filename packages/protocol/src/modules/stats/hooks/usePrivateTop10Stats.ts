import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchPrivateTop10StatsParams,
  selectPrivateTop10Stats,
  selectPrivateTop10StatsLoading,
  selectPrivateTop10StatsState,
  useFetchPrivateTop10StatsQuery,
  useLazyFetchPrivateTop10StatsQuery,
} from '../actions/fetchPrivateTop10Stats';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUsePrivateTop10StatsProps
  extends IFetchPrivateTop10StatsParams,
    IUseQueryProps {}

export const usePrivateTop10Stats = ({
  blockchain,
  group,
  interval,
  skipFetching,
}: IUsePrivateTop10StatsProps) => {
  const params = useMemo(
    (): IFetchPrivateTop10StatsParams => ({ blockchain, group, interval }),
    [blockchain, group, interval],
  );

  useFetchPrivateTop10StatsQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchPrivateTop10StatsQuery();

  const handleFetchTop10Stats = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const top10Stats = useAppSelector(state =>
    selectPrivateTop10Stats(state, params),
  );
  const loading = useAppSelector(state =>
    selectPrivateTop10StatsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectPrivateTop10StatsState(storeState, params),
  );

  return { handleFetchTop10Stats, loading, state, top10Stats };
};
