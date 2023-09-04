import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { PROJECTS_PERSIST_KEY } from '../storage/projectsPersistConfig';

interface IProjectsSlice {
  settings: Record<string, boolean>;
}

export interface ProjectsSettings {
  address: string;
  shouldShowWelcomeDialog: boolean;
}

const initialState: IProjectsSlice = {
  settings: {},
};

export const projectsSlice = createSlice({
  name: PROJECTS_PERSIST_KEY,
  initialState,
  reducers: {
    setProjectsSettings: (state, action: PayloadAction<ProjectsSettings>) => {
      const { address, shouldShowWelcomeDialog } = action.payload;

      state.settings[address] = shouldShowWelcomeDialog;
    },
  },
});

export const selectProjectsSettings = (state: RootState) =>
  state.projects.settings;

export const { setProjectsSettings } = projectsSlice.actions;
