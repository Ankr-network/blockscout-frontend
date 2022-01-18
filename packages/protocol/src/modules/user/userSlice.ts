import { IJwtToken } from '@ankr.com/multirpc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IUserSlice {
  credentials: IJwtToken | null;
}

const initialState: IUserSlice = {
  credentials: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IJwtToken | null>) => {
      state.credentials = action.payload;
    },
  },
});

export const selectCredentials = (state: RootState) => state.user.credentials;

export const { setCredentials } = userSlice.actions;
