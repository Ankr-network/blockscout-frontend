import { createSelector } from '@reduxjs/toolkit';

import { selectCurrentAddress } from 'domains/auth/store';
import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { RootState } from 'store';
import { fetchAllJwtTokensStatuses } from 'domains/jwtToken/action/getAllJwtTokensStatuses';

import { getAllProjects } from '../utils/getAllProjects';
import { fetchAddressWhitelists } from '../actions/fetchAddressWhitelists';
import { fetchIpWhitelists } from '../actions/fetchIpWhitelists';
import { fetchRefererWhitelists } from '../actions/fetchRefererWhitelists';
import { fetchAllWhitelists } from '../actions/fetchAllWhitelists';

const selectNewProject = (state: RootState) => state.newProject;

export const selectNewProjectConfig = createSelector(
  selectNewProject,
  selectCurrentAddress,
  (newProject, address) => newProject[address] || {},
);

export const selectAddressWhitelist = createSelector(
  fetchAddressWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

export const selectIpWhitelist = createSelector(
  fetchIpWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

export const selectRefererWhitelist = createSelector(
  fetchRefererWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

export const selectAllWhitelists = createSelector(
  fetchAllWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

export const selectProjectsStatuses = createSelector(
  fetchAllJwtTokensStatuses.select(),
  ({ data: projectStatuses = [] }) => projectStatuses,
);

export const selectAllProjects = createSelector(
  selectJwtTokens,
  selectAllWhitelists,
  selectProjectsStatuses,
  (projects, whitelists, projectStatuses) =>
    getAllProjects(
      projects.map(item => ({
        userEndpoint: item.userEndpointToken,
        index: item.index,
        name: item.name,
        description: item.description,
      })),
      whitelists,
      projectStatuses,
    ),
);
