import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IReferralProgramSlice } from '../types';

const initialState: IReferralProgramSlice = {
  referralCode: undefined,
};

export const referralProgramSlice = createSlice({
  name: 'referralProgram',
  initialState,
  reducers: {
    setReferralCode: (state, action: PayloadAction<string>) => {
      state.referralCode = action.payload;
    },
    resetReferralCode: state => {
      state.referralCode = initialState.referralCode;
    },
    reset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { reset, resetReferralCode, setReferralCode } =
  referralProgramSlice.actions;
