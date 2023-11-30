import { createSelector } from '@reduxjs/toolkit';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { fetchAllJwtTokensStatuses } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { fetchAllWhitelists } from '../actions/fetchAllWhitelists';
import { getAllProjects } from '../utils/getAllProjects';
import { fetchStatsByRange } from '../actions/fetchStatsByRange';
import { fetchWhitelistsBlockchains } from '../actions/fetchWhitelistsBlockchains';

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
  (isLoadingWhitelists, isLoadingBlockchains, isLoadingStatuses) =>
    isLoadingWhitelists || isLoadingBlockchains || isLoadingStatuses,
);

export const selectProjectsStatuses = createSelector(
  fetchAllJwtTokensStatuses.select({ projects: [] }),
  ({ data: projectStatuses = [] }) => projectStatuses,
);

export const selectProjectsStatsByRange = createSelector(
  fetchStatsByRange.select({ jwtTokens: [] }),
  ({ data: projectsStats = {} }) => projectsStats,
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
