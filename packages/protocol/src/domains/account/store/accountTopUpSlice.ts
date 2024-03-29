import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

import { RootState } from 'store';

import { TopUpOrigin } from '../types';

export interface ITransaction {
  allowanceTransactionHash?: string;
  topUpTransactionHash?: string;
  amount?: BigNumber;
  approvedAmount?: BigNumber;
}

type Address = string;

interface ISetTransactionPayload extends ITransaction {
  address: Address;
}

const initialState: IAccountSlice = {};

export type IAccountSlice = Record<Address, ITransaction> & {
  topUpOrigin?: TopUpOrigin;
};

// Need to save transaction states at local storage
export const accountTopUpSlice = createSlice({
  name: 'account/topUp',
  initialState,
  reducers: {
    setAllowanceTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state[action.payload.address] = {
        ...state[action.payload.address],
        allowanceTransactionHash: action.payload.allowanceTransactionHash,
      };
    },
    setTopUpOrigin: (state, { payload }: PayloadAction<TopUpOrigin>) => {
      state.topUpOrigin = payload;
    },
    setTopUpTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state[action.payload.address] = {
        ...state[action.payload.address],
        topUpTransactionHash: action.payload.topUpTransactionHash,
      };
    },
    setAmount: (state, action: PayloadAction<ISetTransactionPayload>) => {
      state[action.payload.address] = {
        ...state[action.payload.address],
        amount: action.payload.amount,
      };
    },
    setApprovedAmount: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state[action.payload.address] = {
        ...state[action.payload.address],
        approvedAmount: action.payload.approvedAmount,
      };
    },
    resetTopUpOrigin: state => {
      state.topUpOrigin = undefined;
    },
    resetTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state.topUpOrigin = undefined;
      state[action.payload.address] = {};
    },
  },
});

export const selectAccount = (
  state: RootState,
  address: Address,
): ITransaction | undefined => state.accountTopUp[address];

export const selectTopUpOrigin = (state: RootState) =>
  state.accountTopUp.topUpOrigin;

export const selectTransaction = (
  state: RootState,
  currentAccount: string,
): ITransaction | undefined => {
  return state.accountTopUp[currentAccount];
};

export const {
  resetTopUpOrigin,
  resetTransaction,
  setAllowanceTransaction,
  setAmount,
  setApprovedAmount,
  setTopUpOrigin,
  setTopUpTransaction,
} = accountTopUpSlice.actions;
