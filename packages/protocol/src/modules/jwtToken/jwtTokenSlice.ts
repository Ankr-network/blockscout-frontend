import { IJwtToken } from '@ankr.com/multirpc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IJwtTokenSlice {
  token: IJwtToken | null;
}

const initialState: IJwtTokenSlice = {
  token: null,
};

export const jwtTokenSlice = createSlice({
  name: 'jwtToken',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<IJwtToken | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setJwtToken } = jwtTokenSlice.actions;
