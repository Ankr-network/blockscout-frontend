import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  IFetchProjectsWhitelistsBlockchainsParams,
  selectProjectsWhitelistsBlockchainsLoading,
  selectProjectsWhitelistsBlockchainsState,
  useFetchProjectsWhitelistsBlockchainsQuery,
  useLazyFetchProjectsWhitelistsBlockchainsQuery,
} from '../actions/fetchProjectsWhitelistsBlockchains';
import { selectCurrentProjectsWhitelistsBlockchains } from '../store';

export interface IUseProjectsWhitelistsBlockchainsProps
  extends IFetchProjectsWhitelistsBlockchainsParams,
    IUseQueryProps {}

export const useProjectsWhitelistsBlockchains = ({
  group: externalGroup,
  projects,
  skipFetching,
}: IUseProjectsWhitelistsBlockchainsProps) => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const group = externalGroup ?? selectedGroupAddress;

  const params = useMemo(
    (): IFetchProjectsWhitelistsBlockchainsParams => ({ group, projects }),
    [group, projects],
  );

  useFetchProjectsWhitelistsBlockchainsQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchProjectsWhitelistsBlockchainsQuery();

  const handleFetchProjectsWhitelistsBlockchains = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const projectsWhitelistsBlockchains = useAppSelector(state =>
    selectCurrentProjectsWhitelistsBlockchains(state, { group }),
  );
  const loading = useAppSelector(state =>
    selectProjectsWhitelistsBlockchainsLoading(state, params),
  );
  const state = useAppSelector(storeState =>
    selectProjectsWhitelistsBlockchainsState(storeState, params),
  );

  return {
    handleFetchProjectsWhitelistsBlockchains,
    loading,
    projectsWhitelistsBlockchains,
    state,
  };
};
