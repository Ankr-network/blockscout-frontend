import { createSelector } from '@reduxjs/toolkit';
import { UserEndpointToken } from 'multirpc-sdk';

import { fetchAllJwtTokensStatuses } from 'domains/jwtToken/action/getAllJwtTokensStatuses';
import { selectJWTs } from 'domains/jwtToken/action/getAllJwtToken';

import { fetchAllWhitelists } from '../actions/fetchAllWhitelists';
import { fetchWhitelistsBlockchains } from '../actions/fetchWhitelistsBlockchains';
import { getAllProjects, Project } from '../utils/getAllProjects';
import { selectAllProjectsTotalRequestsLoading } from './selectors';
import { selectAllChainsPaths } from '../../../modules/chains/store/selectors';

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

export const selectAllWhitelistsBlockchainsLoading = createSelector(
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
  selectJWTs,
  selectAllWhitelists,
  selectAllWhitelistsBlockchains,
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
  ) =>
    getAllProjects({
      projects,
      whitelists,
      whitelistBlockchains,
      projectStatuses,
      isLoading,
      allChainsPaths,
    }),
);

export const selectProjectChainsByToken = createSelector(
  selectAllProjects,
  (_state: any, token: UserEndpointToken) => token,
  (projects: Project[], token: UserEndpointToken) =>
    projects.find((project: Project) => project.userEndpointToken === token)
      ?.blockchains,
);
