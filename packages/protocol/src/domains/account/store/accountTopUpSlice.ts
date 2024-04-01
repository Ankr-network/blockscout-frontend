import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IAccountSlice,
  ISetTransactionPayload,
  ISwapTransactionPayload,
} from './types';
import { TopUpOrigin } from '../types';

const initialState: IAccountSlice = {};

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
    swapTransaction: (
      state,
      { payload: { from, to } }: PayloadAction<ISwapTransactionPayload>,
    ) => {
      const fromTx = state[from];

      state[to] = fromTx;
    },
  },
});

export const {
  resetTopUpOrigin,
  resetTransaction,
  setAllowanceTransaction,
  setAmount,
  setApprovedAmount,
  setTopUpOrigin,
  setTopUpTransaction,
  swapTransaction,
} = accountTopUpSlice.actions;
