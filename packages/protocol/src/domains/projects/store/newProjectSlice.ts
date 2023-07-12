import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewProjectStep } from '../types';
import {
  NewProjectConfig,
  NewProjectConfigPayload,
  NewProjectSlice,
} from './types';
import { plans } from '../const';

const initialState: NewProjectSlice = {};

const { name: defaultPlanName, monthUSDPrice: defaultMonthUSDPrice } = plans[0];

const DEFAULT_NEW_PROJECT: NewProjectConfig = {
  step: NewProjectStep.Chain,
  project: {
    [NewProjectStep.Chain]: {
      projectName: '',
      tokenIndex: null,
      chainId: '',
      subChainId: '',
      chainName: '',
      chainType: '',
      groupId: '',
    },
    [NewProjectStep.Whitelist]: {
      contractAddress: '',
      userEndpointToken: '',
    },
    [NewProjectStep.Plan]: {
      planName: defaultPlanName,
      planPrice: defaultMonthUSDPrice,
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
