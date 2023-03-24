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
    setSelectedTokenIndex: (
      state,
      action: PayloadAction<ISetTokenIndexPayload>,
    ) => {
      const { tokenIndex, address = '' } = action.payload;

      state[address] = {
        ...state[address],
        address,
        tokenIndex,
      };
    },
    setSelectedProject: (
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
) => state.jwtTokenManager[currentAccount] ?? {};

export const { setSelectedTokenIndex, setSelectedProject } =
  jwtTokenManagerSlice.actions;
