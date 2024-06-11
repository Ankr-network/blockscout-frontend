import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';

const initialState = {
  blockchainsWithUsage: [] as string[],
};

export const enterpriseChainsSlice = createSlice({
  name: 'enterprise/chains',
  initialState,
  reducers: {
    setBlockchainsWithUsage: (
      state,
      { payload: blockchains }: PayloadAction<string[]>,
    ) => {
      state.blockchainsWithUsage = blockchains;
    },
  },
});

export const selectEnterpriseChainsWithUsage = (state: RootState) =>
  state.enterpriseChains.blockchainsWithUsage;

export const { setBlockchainsWithUsage } = enterpriseChainsSlice.actions;
