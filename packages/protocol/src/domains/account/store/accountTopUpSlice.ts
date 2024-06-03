import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAccountSlice } from './types';
import { TopUpOrigin } from '../types';

const initialState: IAccountSlice = {};

export const accountTopUpSlice = createSlice({
  name: 'account/topUp',
  initialState,
  reducers: {
    setTopUpOrigin: (state, { payload }: PayloadAction<TopUpOrigin>) => {
      state.topUpOrigin = payload;
    },
    resetTopUpOrigin: state => {
      state.topUpOrigin = undefined;
    },
  },
});

export const { resetTopUpOrigin, setTopUpOrigin } = accountTopUpSlice.actions;
