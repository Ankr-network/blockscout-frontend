import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { HarmonyMethod } from '../constants/harmony';

type RequestComposerState = {
  evmMethod?: [string];
  harmonyMethod?: [HarmonyMethod];
};

const initialState: RequestComposerState = {};

export const requestComposerSlice = createSlice({
  name: 'chains/request-composer',
  initialState,
  reducers: {
    setEVMMethod: (state, { payload: evmMethod }: PayloadAction<string>) => {
      // We need to use a reference data type for evm method to make sure
      // that react will render the components with the same value
      // for different requests.
      state.evmMethod = [evmMethod];
    },
    resetEVMMethod: state => {
      state.evmMethod = undefined;
    },
    setHarmonyMethod: (
      state,
      { payload: harmonyMethod }: PayloadAction<HarmonyMethod>,
    ) => {
      // We need to use a reference data type for evm method to make sure
      // that react will render the components with the same value
      // for different requests.
      state.harmonyMethod = [harmonyMethod];
    },
    resetHarmonyMethod: state => {
      state.harmonyMethod = undefined;
    },
  },
});

export const selectEVMMethod = (state: RootState) =>
  state.requestComposer.evmMethod;

export const selectHarmonyMethod = (state: RootState) =>
  state.requestComposer.harmonyMethod;

export const {
  resetEVMMethod,
  setEVMMethod,
  resetHarmonyMethod,
  setHarmonyMethod,
} = requestComposerSlice.actions;
