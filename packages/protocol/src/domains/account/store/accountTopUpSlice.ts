import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { MultiService } from 'modules/api/MultiService';

import { RootState } from 'store';

export interface ITransaction {
  allowanceTransactionHash?: string;
  topUpTransactionHash?: string;
  rejectAllowanceTransactionHash?: string;
  amount?: BigNumber;
}

type Address = string;

interface ISetTransactionPayload extends ITransaction {
  address: Address;
}

const initialState: IAccountSlice = {};

export type IAccountSlice = Record<Address, ITransaction>;

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
    setRejectAllowanceTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state[action.payload.address] = {
        ...state[action.payload.address],
        rejectAllowanceTransactionHash:
          action.payload.rejectAllowanceTransactionHash,
      };
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
    resetTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state[action.payload.address] = {};
    },
  },
});

export const selectAccount = (
  state: RootState,
  address: Address,
): ITransaction | undefined => state.accountTopUp[address];

export const selectTransaction = (
  state: RootState,
): ITransaction | undefined => {
  const { service } = MultiService.getInstance();
  const address = service.getKeyProvider().currentAccount();

  return state.accountTopUp[address];
};

export const {
  setAllowanceTransaction,
  setTopUpTransaction,
  setRejectAllowanceTransaction,
  setAmount,
  resetTransaction,
} = accountTopUpSlice.actions;
