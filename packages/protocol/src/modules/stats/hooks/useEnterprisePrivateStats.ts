import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchEnterprisePrivateStatsParams,
  selectEnterprisePrivateStats,
  selectEnterprisePrivateStatsLoading,
  selectEnterprisePrivateStatsState,
  useFetchEnterprisePrivateStatsQuery,
  useLazyFetchEnterprisePrivateStatsQuery,
} from '../actions/fetchEnterprisePrivateStats';
import { REFETCH_STATS_INTERVAL } from '../const';

export interface IUseEnterprisePrivateStats
  extends IUseQueryProps,
    IFetchEnterprisePrivateStatsParams {}

export const useEnterprisePrivateStats = ({
  group,
  interval,
  skipFetching,
}: IUseEnterprisePrivateStats) => {
  const params = useMemo(
    (): IFetchEnterprisePrivateStatsParams => ({ group, interval }),
    [group, interval],
  );

  useFetchEnterprisePrivateStatsQuery(
    getQueryParams({ params, skipFetching }),
    {
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
    },
  );

  const [fetchLazy] = useLazyFetchEnterprisePrivateStatsQuery();

  const handleFetchEnterprisePrivateStats = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const enterprisePrivateStats = useAppSelector(state =>
    selectEnterprisePrivateStats(state, params),
  );

  const loading = useAppSelector(state =>
    selectEnterprisePrivateStatsLoading(state, params),
  );

  const state = useAppSelector(storeState =>
    selectEnterprisePrivateStatsState(storeState, params),
  );

  return {
    handleFetchEnterprisePrivateStats,
    loading,
    enterprisePrivateStats,
    state,
  };
};
