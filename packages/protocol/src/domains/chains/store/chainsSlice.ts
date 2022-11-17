import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { ChainsRoutesConfig } from '../routes';

const initialState = {
  originURL: ChainsRoutesConfig.chains.path,
};

export const chainsSlilce = createSlice({
  name: 'chains/originURL',
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

export const selectChainsOriginURL = (state: RootState) =>
  state.chainsOriginURL.originURL;

export const { setOriginChainURL } = chainsSlilce.actions;
