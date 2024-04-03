import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IAccountSlice,
  ICreateTxForDepositAddressPayload,
  ISetTransactionPayload,
} from './types';
import { TopUpOrigin } from '../types';

const initialState: IAccountSlice = {};

export const accountTopUpSlice = createSlice({
  name: 'account/topUp',
  initialState,
  reducers: {
    setAllowanceTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
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
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        topUpTransactionHash: action.payload.topUpTransactionHash,
      };
    },
    setAmount: (state, action: PayloadAction<ISetTransactionPayload>) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        amount: action.payload.amount,
      };
    },
    setAmountToApprove: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        amountToApprove: action.payload.amountToApprove,
      };
    },
    setApprovedAmount: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        approvedAmount: action.payload.approvedAmount,
      };
    },
    setIsProcessing: (state, action: PayloadAction<ISetTransactionPayload>) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        isProcessing: action.payload.isProcessing,
      };
    },
    resetTopUpOrigin: state => {
      state.topUpOrigin = undefined;
    },
    resetTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state.topUpOrigin = undefined;
      state[address] = {};
    },
    createDepositTxState: (
      state,
      action: PayloadAction<ICreateTxForDepositAddressPayload>,
    ) => {
      const {
        payload: { authAddress, depositAddress },
      } = action;

      const authAddressTx = state[authAddress.toLowerCase()];

      state[depositAddress.toLowerCase()] = {
        ...authAddressTx,
        isProcessing: true,
      };
    },
  },
});

export const {
  createDepositTxState,
  resetTopUpOrigin,
  resetTransaction,
  setAllowanceTransaction,
  setAmount,
  setAmountToApprove,
  setApprovedAmount,
  setIsProcessing,
  setTopUpOrigin,
  setTopUpTransaction,
} = accountTopUpSlice.actions;
