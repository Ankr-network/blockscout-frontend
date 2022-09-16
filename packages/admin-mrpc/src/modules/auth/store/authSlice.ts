import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IAuthSlice {
  address?: string;
  backofficeAuthorizationToken?: string;
}

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      const { address, backofficeAuthorizationToken } = action.payload;

      if (backofficeAuthorizationToken) {
        state.backofficeAuthorizationToken = backofficeAuthorizationToken;
      }

      if (address) {
        state.address = address;
      }
    },

    resetAuthData: state => {
      state.address = undefined;
      state.backofficeAuthorizationToken = undefined;
    },
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export const {
  reducer: authReducer,
  actions: { setAuthData, resetAuthData },
} = authSlice;
