import { createSelector } from '@reduxjs/toolkit';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { fetchAllJwtTokensStatuses } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { fetchAllWhitelists } from '../actions/fetchAllWhitelists';
import { getAllProjects } from '../utils/getAllProjects';
import { fetchStatsByRange } from '../actions/fetchStatsByRange';

export const selectAllWhitelists = createSelector(
  fetchAllWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
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
  selectProjectsStatuses,
  (projects, whitelists, projectStatuses) =>
    getAllProjects(projects, whitelists, projectStatuses),
);
