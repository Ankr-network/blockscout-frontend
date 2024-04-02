import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewProjectStep } from '../types';
import {
  AddToWhitelistFormData,
  NewProjectConfig,
  NewProjectConfigPayload,
  NewProjectSlice,
} from './types';

const initialNewProjectState: NewProjectSlice = {};

export const initialDialogValues: AddToWhitelistFormData = {
  type: UserEndpointTokenMode.REFERER,
  value: '',
  chains: [],
};

const DEFAULT_NEW_PROJECT: NewProjectConfig = {
  step: NewProjectStep.General,
  project: {
    [NewProjectStep.General]: {
      name: '',
      description: '',
      tokenIndex: null,
      userEndpointToken: '',
    },
    [NewProjectStep.Chains]: {
      isSelectedAll: false,
      selectedMainnetIds: [],
      selectedTestnetIds: [],
      selectedDevnetIds: [],
      selectedBeaconMainnetIds: [],
      selectedBeaconTestnetIds: [],
      selectedOpnodeMainnetIds: [],
      selectedOpnodeTestnetIds: [],
    },
    [NewProjectStep.Whitelist]: {
      whitelistItems: [],
      isEditingWhitelistDialog: false,
      shouldSkipFormReset: false,
      indexOfEditingWhitelistItem: undefined,
      whitelistDialog: initialDialogValues,
      isCheckedOut: false,
    },
  },
};

export const newProjectSlice = createSlice({
  name: 'newProject',
  initialState: initialNewProjectState,
  reducers: {
    setStepConfig: (state, action: PayloadAction<NewProjectConfigPayload>) => {
      const { address, step, projectStepConfig, nextStep } = action.payload;

      if (!state[address]) {
        state[address] = {
          ...DEFAULT_NEW_PROJECT,
        };
      }

      state[address] = {
        ...state[address],
        step: nextStep,
        project: {
          ...state[address].project,
          [step]: projectStepConfig,
        },
      };
    },
    resetConfig: (state, action: PayloadAction<string>) => {
      state[action.payload] = DEFAULT_NEW_PROJECT;
    },
  },
});

export const { setStepConfig, resetConfig } = newProjectSlice.actions;
