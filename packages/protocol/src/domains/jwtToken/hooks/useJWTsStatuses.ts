import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchJWTsStatusesParams,
  selectJWTsStatuses,
  selectJWTsStatusesLoading,
  selectJWTsStatusesState,
  useFetchJWTsStatusesQuery,
  useLazyFetchJWTsStatusesQuery,
} from '../action/fetchJWTsStatuses';

export interface IUseJWTsStatusesProps
  extends IFetchJWTsStatusesParams,
    IUseQueryProps {}

export const useJWTsStatuses = ({
  group,
  projects,
  skipFetching,
}: IUseJWTsStatusesProps) => {
  const params = useMemo(
    (): IFetchJWTsStatusesParams => ({ group, projects }),
    [group, projects],
  );

  useFetchJWTsStatusesQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchJWTsStatusesQuery();

  const handleFetchJWTsStatuses = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const jwtsStatuses = useAppSelector(state =>
    selectJWTsStatuses(state, params),
  );
  const loading = useAppSelector(state =>
    selectJWTsStatusesLoading(state, params),
  );
  const jwtsStatusesState = useAppSelector(state =>
    selectJWTsStatusesState(state, params),
  );

  return {
    handleFetchJWTsStatuses,
    jwtsStatuses,
    loading,
    state: jwtsStatusesState,
  };
};
