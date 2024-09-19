import { Address } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

export interface JwtManagerToken {
  id: string;
  index: number;
  userEndpointToken: string;
  jwtData: string;
  name: string;
  description: string;
}

interface ISetTokenIndexPayload {
  tokenIndex: number;
  address?: Address;
}

interface ISetSelectedProjectPayload {
  selectedProject?: string;
  address?: Address;
}

interface ITokenManagerConfigPayload {
  shouldShowTokenManager?: boolean;
  selectedProject?: string;
  address?: Address;
  tokenIndex: number;
}

export type IJwtTokenManagerSlice = Record<Address, ITokenManagerConfigPayload>;

const initialState: IJwtTokenManagerSlice = {};

export const jwtTokenManagerSlice = createSlice({
  name: 'jwtTokenManager',
  initialState,
  reducers: {
    // uses for jwt manager component
    setSelectedTokenIndex: (
      state,
      action: PayloadAction<ISetTokenIndexPayload>,
    ) => {
      const { address = '', tokenIndex } = action.payload;

      state[address] = {
        ...state[address],
        address,
        tokenIndex,
      };
    },
    // uses for selects, when we need only endpoint token
    setSelectedProjectEndpointToken: (
      state,
      action: PayloadAction<ISetSelectedProjectPayload>,
    ) => {
      const { address = '', selectedProject } = action.payload;

      state[address] = {
        ...state[address],
        address,
        selectedProject,
      };
    },
  },
});

export const selectTokenManagerConfig = (
  state: RootState,
  currentAccount = '',
) => state.jwtTokenManager[currentAccount] || {};

export const { setSelectedProjectEndpointToken, setSelectedTokenIndex } =
  jwtTokenManagerSlice.actions;
