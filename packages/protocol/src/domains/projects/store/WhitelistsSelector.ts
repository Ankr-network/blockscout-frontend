import { UserEndpointToken } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import {
  IFetchJWTsParams,
  selectJWTs,
} from 'domains/jwtToken/action/fetchJWTs';
import { RootState } from 'store';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';
import {
  selectJWTsStatuses,
  selectJWTsStatusesLoading,
} from 'domains/jwtToken/action/fetchJWTsStatuses';

import { Project, getAllProjects } from '../utils/getAllProjects';
import {
  selectProjectsWhitelists,
  selectProjectsWhitelistsLoading,
} from '../actions/fetchProjectsWhitelists';
import {
  selectProjectsWhitelistsBlockchains,
  selectProjectsWhitelistsBlockchainsLoading,
} from '../actions/fetchProjectsWhitelistsBlockchains';

export const selectCurrentProjectsStatuses = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) => selectJWTsStatuses(state, { group, projects }),
);

export const selectCurrentProjectsStatusesLoading = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectJWTsStatusesLoading(state, { group, projects }),
);

export const selectCurrentProjectsWhitelists = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectProjectsWhitelists(state, { group, projects }),
);

export const selectCurrentProjectsWhitelistsLoading = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectProjectsWhitelistsLoading(state, { group, projects }),
);

export const selectCurrentProjectsWhitelistsBlockchains = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectProjectsWhitelistsBlockchains(state, { group, projects }),
);

export const selectCurrentProjectsWhitelistsBlockchainsLoading = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectProjectsWhitelistsBlockchainsLoading(state, { group, projects }),
);

export const selectProjectsPageRequestsLoading = createSelector(
  selectCurrentProjectsWhitelistsLoading,
  selectCurrentProjectsWhitelistsBlockchainsLoading,
  selectCurrentProjectsStatusesLoading,
  (whitelistsLoading, whitelistsBlockchainsLoading, statusesLoading) =>
    whitelistsLoading || whitelistsBlockchainsLoading || statusesLoading,
);

export const selectAllProjects = createSelector(
  selectJWTs,
  selectCurrentProjectsWhitelists,
  selectCurrentProjectsWhitelistsBlockchains,
  selectCurrentProjectsStatuses,
  selectProjectsPageRequestsLoading,
  selectAllChainsPaths,
  (
    projects,
    whitelists,
    whitelistBlockchains,
    projectStatuses,
    isLoading,
    allChainsPaths,
    // eslint-disable-next-line max-params
  ) => {
    return getAllProjects({
      projects,
      whitelists,
      whitelistBlockchains,
      projectStatuses,
      isLoading,
      allChainsPaths,
    });
  },
);

export const selectProjectChainsByToken = createSelector(
  (
    state: RootState,
    params: IFetchJWTsParams & { token?: UserEndpointToken },
  ) => [state, params] as const,
  ([state, params]) => {
    const { token, ...rest } = params;
    const projects = selectAllProjects(state, rest);

    return projects.find(
      ({ userEndpointToken }: Project) =>
        userEndpointToken.toLowerCase() === token?.toLowerCase(),
    )?.blockchains;
  },
);
