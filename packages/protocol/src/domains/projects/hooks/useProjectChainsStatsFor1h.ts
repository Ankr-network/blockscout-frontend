import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectChainsStatsFor1hParams,
  selectProjectChainsStatsFor1h,
  selectProjectChainsStatsFor1hLoading,
  useFetchProjectChainsStatsFor1hQuery,
  useLazyFetchProjectChainsStatsFor1hQuery,
} from '../actions/fetchProjectChainsStatsFor1h';

export interface IUseProjectChainsStatsFor1hProps
  extends Omit<IFetchProjectChainsStatsFor1hParams, 'gateway'>,
    IUseQueryProps {}

export const useProjectChainsStatsFor1h = ({
  group,
  skipFetching,
  token,
}: IUseProjectChainsStatsFor1hProps) => {
  const params = useMemo(
    (): IFetchProjectChainsStatsFor1hParams => ({ group, token }),
    [group, token],
  );

  useFetchProjectChainsStatsFor1hQuery(
    getQueryParams({ params, skipFetching }),
    { refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL },
  );

  const [fetchLazy] = useLazyFetchProjectChainsStatsFor1hQuery();

  const handleFetchProjectChainsStatsFor1h = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectChainsStatsFor1h = useAppSelector(state =>
    selectProjectChainsStatsFor1h(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectProjectChainsStatsFor1hLoading(state, params),
  );

  return {
    handleFetchProjectChainsStatsFor1h,
    isLoading,
    projectChainsStatsFor1h,
  };
};
