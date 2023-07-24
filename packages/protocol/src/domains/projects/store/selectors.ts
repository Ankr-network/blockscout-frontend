import { createSelector } from '@reduxjs/toolkit';

import { selectCurrentAddress } from 'domains/auth/store';
import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { RootState } from 'store';

import { fetchWhitelists } from '../actions/fetchWhitelists';
import { getAllProjects } from '../utils/getAllProjects';

const selectNewProject = (state: RootState) => state.newProject;

export const selectNewProjectConfig = createSelector(
  selectNewProject,
  selectCurrentAddress,
  (newProject, address) => newProject[address] || {},
);

export const selectWhitelist = createSelector(
  fetchWhitelists.select({}),
  ({ data: whitelists = [] }) => whitelists,
);

export const selectAllProjects = createSelector(
  selectJwtTokens,
  selectWhitelist,
  (projects, whitelists) =>
    getAllProjects(
      projects.map(item => ({
        userEndpoint: item.userEndpointToken,
        index: item.index,
      })),
      whitelists,
    ),
);
