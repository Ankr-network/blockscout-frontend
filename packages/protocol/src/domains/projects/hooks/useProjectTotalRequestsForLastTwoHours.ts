import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  FetchProjectTotalRequestsForLastTwoHoursParams,
  selectProjectTotalRequestsForLastTwoHoursLoading,
  useFetchProjectTotalRequestsForLastTwoHoursQuery,
  useLazyFetchProjectTotalRequestsForLastTwoHoursQuery,
  selectProjectTotalRequestsForLastTwoHours,
} from '../actions/fetchProjectTotalRequestsForLastTwoHours';

export interface IUseProjectTotalRequestsForLastTwoHoursProps
  extends Omit<FetchProjectTotalRequestsForLastTwoHoursParams, 'gateway'>,
    IUseQueryProps {}

export const useProjectTotalRequestsForLastTwoHours = ({
  group,
  skipFetching,
  token,
}: IUseProjectTotalRequestsForLastTwoHoursProps) => {
  const params = useMemo(
    (): FetchProjectTotalRequestsForLastTwoHoursParams => ({ group, token }),
    [group, token],
  );

  useFetchProjectTotalRequestsForLastTwoHoursQuery(
    getQueryParams({ params, skipFetching }),
    { refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL },
  );

  const [fetchLazy] = useLazyFetchProjectTotalRequestsForLastTwoHoursQuery();

  const handleFetchProjectTotalRequestsForLastTwoHours = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectTotalRequestsForLastTwoHours = useAppSelector(state =>
    selectProjectTotalRequestsForLastTwoHours(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectProjectTotalRequestsForLastTwoHoursLoading(state, params),
  );

  return {
    handleFetchProjectTotalRequestsForLastTwoHours,
    isLoading,
    projectTotalRequestsForLastTwoHours,
  };
};
