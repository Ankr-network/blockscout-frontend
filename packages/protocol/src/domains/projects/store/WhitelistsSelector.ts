import { UserEndpointToken } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import {
  IFetchJWTsParams,
  selectJWTs,
} from 'domains/jwtToken/action/fetchJWTs';
import { RootState } from 'store';
import { fetchAllJwtTokensStatuses } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { fetchAllWhitelists } from '../actions/fetchAllWhitelists';
import { getAllProjects, Project } from '../utils/getAllProjects';
import { selectAllChainsPaths } from '../../../modules/chains/store/selectors';
import { selectAllProjectsTotalRequestsLoading } from './selectors';
import {
  selectWhitelistsBlockchains,
  selectWhitelistsBlockchainsLoading,
} from '../actions/fetchWhitelistsBlockchains';

const selectAllWhitelists = createSelector(
  fetchAllWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

const selectAllWhitelistsLoading = createSelector(
  fetchAllWhitelists.select({}),
  ({ isLoading }) => isLoading,
);

const selectProjectsStatusesLoading = createSelector(
  fetchAllJwtTokensStatuses.select({ projects: [] }),
  ({ isLoading }) => isLoading,
);

export const selectWhitelistBlockchainsForAllJWTs = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectWhitelistsBlockchains(state, { group, projects }),
);

export const selectWhitelistBlockchainsForAllJWTsLoading = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectWhitelistsBlockchainsLoading(state, { group, projects }),
);

export const selectProjectsPageRequestsLoading = createSelector(
  selectAllWhitelistsLoading,
  selectWhitelistBlockchainsForAllJWTsLoading,
  selectProjectsStatusesLoading,
  selectAllProjectsTotalRequestsLoading,
  (
    isLoadingWhitelists,
    isLoadingBlockchains,
    isLoadingStatuses,
    allProjectsTotalRequestsLoading,
    // eslint-disable-next-line max-params
  ) =>
    isLoadingWhitelists ||
    isLoadingBlockchains ||
    isLoadingStatuses ||
    allProjectsTotalRequestsLoading,
);

export const selectProjectsStatuses = createSelector(
  fetchAllJwtTokensStatuses.select({ projects: [] }),
  ({ data: projectStatuses = [] }) => projectStatuses,
);

export const selectProjectsStatusesIsUninitialized = createSelector(
  fetchAllJwtTokensStatuses.select({ projects: [] }),
  ({ isUninitialized }) => isUninitialized,
);

export const selectAllProjects = createSelector(
  selectJWTs,
  selectAllWhitelists,
  selectWhitelistBlockchainsForAllJWTs,
  selectProjectsStatuses,
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
  selectAllProjects,
  (_state: RootState, token: UserEndpointToken) => token,
  (projects: Project[], token: UserEndpointToken) =>
    projects.find((project: Project) => project.userEndpointToken === token)
      ?.blockchains,
);
