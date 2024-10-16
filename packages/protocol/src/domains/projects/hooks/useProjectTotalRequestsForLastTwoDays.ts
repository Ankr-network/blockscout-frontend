import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  FetchProjectTotalRequestsForLastTwoDaysParams,
  selectProjectTotalRequestsForLastTwoDaysLoading,
  useFetchProjectTotalRequestsForLastTwoDaysQuery,
  useLazyFetchProjectTotalRequestsForLastTwoDaysQuery,
  selectProjectTotalRequestsForLastTwoDays,
} from '../actions/fetchProjectTotalRequestsForLastTwoDays';

export interface IUseProjectTotalRequestsForLastTwoDaysProps
  extends Omit<FetchProjectTotalRequestsForLastTwoDaysParams, 'gateway'>,
    IUseQueryProps {}

export const useProjectTotalRequestsForLastTwoDays = ({
  group,
  skipFetching,
  token,
}: IUseProjectTotalRequestsForLastTwoDaysProps) => {
  const params = useMemo(
    (): FetchProjectTotalRequestsForLastTwoDaysParams => ({ group, token }),
    [group, token],
  );

  useFetchProjectTotalRequestsForLastTwoDaysQuery(
    getQueryParams({ params, skipFetching }),
    { refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL },
  );

  const [fetchLazy] = useLazyFetchProjectTotalRequestsForLastTwoDaysQuery();

  const handleFetchProjectTotalRequestsForLastTwoDays = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectTotalRequestsForLastTwoDays = useAppSelector(state =>
    selectProjectTotalRequestsForLastTwoDays(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectProjectTotalRequestsForLastTwoDaysLoading(state, params),
  );

  return {
    handleFetchProjectTotalRequestsForLastTwoDays,
    isLoading,
    projectTotalRequestsForLastTwoDays,
  };
};
