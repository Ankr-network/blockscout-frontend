import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';

type RequestComposerState = {
  evmMethod?: [string];
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
  },
});

export const selectEVMMethod = (state: RootState) =>
  state.requestComposer.evmMethod;

export const { resetEVMMethod, setEVMMethod } = requestComposerSlice.actions;
