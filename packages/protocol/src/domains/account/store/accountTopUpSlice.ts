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
    setAmountToDeposit: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        amountToDeposit: action.payload.amountToDeposit,
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
    setTransactionCurrency: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        currency: action.payload.currency,
      };
    },
    setTransactionNetwork: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        network: action.payload.network,
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

      state[depositAddress.toLowerCase()] = { ...authAddressTx };
    },
    setIsConfirmed: (state, action: PayloadAction<ISetTransactionPayload>) => {
      const address = action.payload.address.toLowerCase();

      state[address] = {
        ...state[address],
        isConfirmed: action.payload.isConfirmed,
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
  setAmountToDeposit,
  setApprovedAmount,
  setIsConfirmed,
  setTopUpOrigin,
  setTopUpTransaction,
  setTransactionCurrency,
  setTransactionNetwork,
} = accountTopUpSlice.actions;
