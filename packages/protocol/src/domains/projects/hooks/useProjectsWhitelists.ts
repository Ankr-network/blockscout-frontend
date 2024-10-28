import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchProjectsWhitelistsParams,
  selectProjectsWhitelists,
  selectProjectsWhitelistsLoading,
  selectProjectsWhitelistsState,
  useFetchProjectsWhitelistsQuery,
  useLazyFetchProjectsWhitelistsQuery,
} from '../actions/fetchProjectsWhitelists';

export interface IUseProjectsWhitelistsProps
  extends IFetchProjectsWhitelistsParams,
    IUseQueryProps {}

export const useProjectsWhitelists = ({
  group,
  projects,
  skipFetching = false,
}: IUseProjectsWhitelistsProps) => {
  const params = useMemo(
    (): IFetchProjectsWhitelistsParams => ({ group, projects }),
    [group, projects],
  );

  useFetchProjectsWhitelistsQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchProjectsWhitelistsQuery();

  const handleFetchProjectWhitelist = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectsWhitelists = useAppSelector(state =>
    selectProjectsWhitelists(state, params),
  );

  const loading = useAppSelector(state =>
    selectProjectsWhitelistsLoading(state, params),
  );

  const projectsWhitelistsState = useAppSelector(state =>
    selectProjectsWhitelistsState(state, params),
  );

  return {
    handleFetchProjectWhitelist,
    loading,
    projectsWhitelists,
    state: projectsWhitelistsState,
  };
};
