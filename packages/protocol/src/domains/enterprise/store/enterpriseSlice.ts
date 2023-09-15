import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { EnterpriseRoutesConfig } from '../routes';

const initialState = {
  originURL: EnterpriseRoutesConfig.chains.path,
};

export const enterpriseChainsSlice = createSlice({
  name: 'enterprise/originURL',
  initialState,
  reducers: {
    setOriginChainURL: (
      state,
      { payload: originURL }: PayloadAction<string>,
    ) => {
      state.originURL = originURL;
    },
  },
});

export const selectEnterpriseChainsOriginURL = (state: RootState) =>
  state.enterpriseOriginURL.originURL;

export const { setOriginChainURL } = enterpriseChainsSlice.actions;
