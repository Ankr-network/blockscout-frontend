import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectChainsStatsFor24hParams,
  selectProjectChainsStatsFor24h,
  selectProjectChainsStatsFor24hLoading,
  useFetchProjectChainsStatsFor24hQuery,
  useLazyFetchProjectChainsStatsFor24hQuery,
} from '../actions/fetchProjectChainsStatsFor24h';

export interface IUseProjectChainsStatsFor24hProps
  extends Omit<IFetchProjectChainsStatsFor24hParams, 'gateway'>,
    IUseQueryProps {}

export const useProjectChainsStatsFor24h = ({
  group,
  skipFetching,
  token,
}: IUseProjectChainsStatsFor24hProps) => {
  const params = useMemo(
    (): IFetchProjectChainsStatsFor24hParams => ({ group, token }),
    [group, token],
  );

  useFetchProjectChainsStatsFor24hQuery(
    getQueryParams({ params, skipFetching }),
    { refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL },
  );

  const [fetchLazy] = useLazyFetchProjectChainsStatsFor24hQuery();

  const handleFetchProjectChainsStatsFor24h = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectChainsStatsFor24h = useAppSelector(state =>
    selectProjectChainsStatsFor24h(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectProjectChainsStatsFor24hLoading(state, params),
  );

  return {
    handleFetchProjectChainsStatsFor24h,
    isLoading,
    projectChainsStatsFor24h,
  };
};
