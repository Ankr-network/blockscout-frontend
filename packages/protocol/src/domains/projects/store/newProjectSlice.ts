import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewProjectStep } from '../types';
import {
  AddToWhitelistFormData,
  NewProjectConfig,
  NewProjectConfigPayload,
  NewProjectSlice,
} from './types';
import { plans } from '../const';

const initialState: NewProjectSlice = {};

export const initialDialogValues: AddToWhitelistFormData = {
  type: undefined,
  value: '',
  chains: [],
};

const { name: defaultPlanName, USDPrice: defaultUSDPrice } = plans[0];

const DEFAULT_NEW_PROJECT: NewProjectConfig = {
  step: NewProjectStep.Chain,
  project: {
    [NewProjectStep.Chain]: {
      projectName: '',
      tokenIndex: null,
      selectedMainnetIds: [],
      selectedTestnetIds: [],
      selectedDevnetIds: [],
    },
    [NewProjectStep.Whitelist]: {
      userEndpointToken: '',
      whitelistItems: [],
      whitelistDialog: initialDialogValues,
    },
    [NewProjectStep.Plan]: {
      planName: defaultPlanName,
      planPrice: defaultUSDPrice,
    },
    [NewProjectStep.Checkout]: {
      isCheckedOut: false,
    },
  },
};

export const newProjectSlice = createSlice({
  name: 'newProject',
  initialState,
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
