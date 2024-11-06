import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchEnterprisePrivateTop10StatsParams,
  selectEnterprisePrivateTop10Stats,
  selectEnterprisePrivateTop10StatsLoading,
  selectEnterprisePrivateTop10StatsState,
  useFetchEnterprisePrivateTop10StatsQuery,
  useLazyFetchEnterprisePrivateTop10StatsQuery,
} from '../actions/fetchEnterprisePrivateTop10Stats';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUseEnterprisePrivateTop10StatsProps
  extends IFetchEnterprisePrivateTop10StatsParams,
    IUseQueryProps {}

export const useEnterprisePrivateTop10Stats = ({
  blockchain,
  group,
  interval,
  skipFetching,
}: IUseEnterprisePrivateTop10StatsProps) => {
  const params = useMemo(
    (): IFetchEnterprisePrivateTop10StatsParams => ({
      blockchain,
      group,
      interval,
    }),
    [blockchain, group, interval],
  );

  useFetchEnterprisePrivateTop10StatsQuery(
    getQueryParams({ params, skipFetching }),
    {
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
    },
  );

  const [fetchLazy] = useLazyFetchEnterprisePrivateTop10StatsQuery();

  const handleFetchTop10Stats = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const top10Stats = useAppSelector(state =>
    selectEnterprisePrivateTop10Stats(state, params),
  );
  const loading = useAppSelector(state =>
    selectEnterprisePrivateTop10StatsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectEnterprisePrivateTop10StatsState(storeState, params),
  );

  return { handleFetchTop10Stats, loading, state, top10Stats };
};
