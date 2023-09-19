import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { PROJECTS_PERSIST_KEY } from '../storage/projectsPersistConfig';

interface IProjectsSlice {
  settings: Record<string, boolean>;
}

export interface ProjectsSettings {
  address: string;
  wasWelcomeDialogShown: boolean;
}

const initialState: IProjectsSlice = {
  settings: {},
};

export const projectsSlice = createSlice({
  name: PROJECTS_PERSIST_KEY,
  initialState,
  reducers: {
    setProjectsSettings: (state, action: PayloadAction<ProjectsSettings>) => {
      const { address, wasWelcomeDialogShown } = action.payload;

      state.settings[address] = wasWelcomeDialogShown;
    },
  },
});

export const selectProjectsSettings = (state: RootState) =>
  state.projects.settings;

export const { setProjectsSettings } = projectsSlice.actions;
