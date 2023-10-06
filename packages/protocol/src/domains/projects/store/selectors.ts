import { createSelector } from '@reduxjs/toolkit';

import { selectCurrentAddress } from 'domains/auth/store';
import { RootState } from 'store';

import { NewProjectStep } from '../types';

const selectNewProject = (state: RootState) => state.newProject;

export const selectNewProjectConfig = createSelector(
  selectNewProject,
  selectCurrentAddress,
  (newProject, address) => newProject[address] || {},
);

export const selectDraftTokenIndex = createSelector(
  selectNewProjectConfig,
  ({ project = {} }) => project?.[NewProjectStep.General]?.tokenIndex,
);
