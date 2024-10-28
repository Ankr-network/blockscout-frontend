import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectTotalRequestsParams,
  selectProjectTotalRequests,
  selectProjectTotalRequestsLoading,
  selectProjectTotalRequestsState,
  useFetchProjectTotalRequestsQuery,
  useLazyFetchProjectTotalRequestsQuery,
} from '../actions/fetchProjectTotalRequests';

export interface IUseProjectTotalRequestsProps
  extends Omit<IFetchProjectTotalRequestsParams, 'gateway'>,
    IUseQueryProps {}

export const useProjectTotalRequests = ({
  duration,
  group,
  skipFetching,
  token,
}: IUseProjectTotalRequestsProps) => {
  const params = useMemo(
    (): IFetchProjectTotalRequestsParams => ({ duration, group, token }),
    [duration, group, token],
  );

  useFetchProjectTotalRequestsQuery(getQueryParams({ params, skipFetching }), {
    refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
  });

  const [fetchLazy] = useLazyFetchProjectTotalRequestsQuery();

  const handleFetchProjectTotalRequests = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectTotalRequests = useAppSelector(state =>
    selectProjectTotalRequests(state, params),
  );
  const loading = useAppSelector(state =>
    selectProjectTotalRequestsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectProjectTotalRequestsState(storeState, params),
  );

  return {
    handleFetchProjectTotalRequests,
    loading,
    projectTotalRequests,
    state,
  };
};
