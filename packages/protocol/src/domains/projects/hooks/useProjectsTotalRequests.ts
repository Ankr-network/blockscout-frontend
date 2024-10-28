import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectsTotalRequestsParams,
  selectProjectsTotalRequests,
  selectProjectsTotalRequestsLoading,
  selectProjectsTotalRequestsState,
  useFetchProjectsTotalRequestsQuery,
  useLazyFetchProjectsTotalRequestsQuery,
} from '../actions/fetchProjectsTotalRequests';

export interface IUseProjectsTotalRequestsProps
  extends IFetchProjectsTotalRequestsParams,
    IUseQueryProps {}

export const useProjectsTotalRequests = ({
  duration,
  group,
  skipFetching,
  tokens,
}: IUseProjectsTotalRequestsProps) => {
  const params = useMemo(
    (): IFetchProjectsTotalRequestsParams => ({ duration, group, tokens }),
    [duration, group, tokens],
  );

  useFetchProjectsTotalRequestsQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchProjectsTotalRequestsQuery();

  const handleFetchProjectsTotalRequests = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectsTotalRequests = useAppSelector(state =>
    selectProjectsTotalRequests(state, params),
  );
  const loading = useAppSelector(state =>
    selectProjectsTotalRequestsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectProjectsTotalRequestsState(storeState, params),
  );

  return {
    handleFetchProjectsTotalRequests,
    loading,
    projectsTotalRequests,
    state,
  };
};
