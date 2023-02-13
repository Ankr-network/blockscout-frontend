import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { ZERO } from '../const';

export interface IAllowanceSlice {
  value: BigNumber;
}

const initialState: IAllowanceSlice = {
  value: ZERO,
};

export const allowanceSlice = createSlice({
  name: 'allowance',
  initialState,
  reducers: {
    setAllowance: (state, action: PayloadAction<BigNumber>) => {
      state.value = action.payload;
    },
    resetAllowance: state => {
      state.value = ZERO;
    },
  },
});

const selectAllowanceState = (state: RootState) => state.allowance;
export const selectAllowance = createSelector(
  selectAllowanceState,
  state => state.value,
);

export const {
  reducer: allowanceReducer,
  actions: { setAllowance, resetAllowance },
} = allowanceSlice;
