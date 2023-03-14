import { Address } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface JwtManagerToken {
  index: number;
  userEndpointToken: string;
  jwtData: string;
}

interface ISetTokenIndexPayload {
  tokenIndex: number;
  address?: Address;
}

export type IJwtTokenManagerSlice = Record<Address, number>;

const initialState: IJwtTokenManagerSlice = {};

export const jwtTokenManagerSlice = createSlice({
  name: 'jwtTokenManager',
  initialState,
  reducers: {
    setSelectedTokenIndex: (
      state,
      action: PayloadAction<ISetTokenIndexPayload>,
    ) => {
      const { tokenIndex, address = '' } = action.payload;

      state[address] = tokenIndex;
    },
  },
});

export const selectTokenIndex = (state: RootState, currentAccount = '') =>
  state.jwtTokenManager[currentAccount];

export const { setSelectedTokenIndex } = jwtTokenManagerSlice.actions;
