import { createSelector } from '@reduxjs/toolkit';
import { UserEndpointToken } from 'multirpc-sdk';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { fetchAllJwtTokensStatuses } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { fetchAllWhitelists } from '../actions/fetchAllWhitelists';
import { fetchWhitelistsBlockchains } from '../actions/fetchWhitelistsBlockchains';
import { getAllProjects, Project } from '../utils/getAllProjects';
import { selectAllProjectsTotalRequestsLoading } from './selectors';

const selectAllWhitelists = createSelector(
  fetchAllWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

const selectAllWhitelistsLoading = createSelector(
  fetchAllWhitelists.select({}),
  ({ isLoading }) => isLoading,
);

const selectAllWhitelistsBlockchains = createSelector(
  fetchWhitelistsBlockchains.select(undefined as unknown as never),
  ({ data: whitelists = [] }) => whitelists,
);

const selectAllWhitelistsBlockchainsLoading = createSelector(
  fetchWhitelistsBlockchains.select(undefined as unknown as never),
  ({ isLoading }) => isLoading,
);

const selectProjectsStatusesLoading = createSelector(
  fetchAllJwtTokensStatuses.select({ projects: [] }),
  ({ isLoading }) => isLoading,
);

export const selectProjectsPageRequestsLoading = createSelector(
  selectAllWhitelistsLoading,
  selectAllWhitelistsBlockchainsLoading,
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
  selectJwtTokens,
  selectAllWhitelists,
  selectAllWhitelistsBlockchains,
  selectProjectsStatuses,
  selectProjectsPageRequestsLoading,
  // eslint-disable-next-line max-params
  (projects, whitelists, whitelistBlockchains, projectStatuses, isLoading) =>
    getAllProjects({
      projects,
      whitelists,
      whitelistBlockchains,
      projectStatuses,
      isLoading,
    }),
);

export const selectProjectChainsByToken = createSelector(
  selectAllProjects,
  (_state: any, token: UserEndpointToken) => token,
  (projects: Project[], token: UserEndpointToken) =>
    projects.find((project: Project) => project.userEndpointToken === token)
      ?.blockchains,
);
