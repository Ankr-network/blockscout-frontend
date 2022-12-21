import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { featuresConfig } from 'modules/common/const';

export interface IDashboardSlice {
  isSmallBalanceVisible: boolean;
}

const initialState: IDashboardSlice = {
  isSmallBalanceVisible: !featuresConfig.isSmallBalancesActive,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    showSmallBalances: (state, action: PayloadAction<boolean>) => {
      state.isSmallBalanceVisible = action.payload;
    },
  },
});

const selectDashboard = (state: RootState) => state.dashboard;

export const selectSmallBalanceVisibility = createSelector(
  selectDashboard,
  state => state.isSmallBalanceVisible,
);

export const { showSmallBalances } = dashboardSlice.actions;
