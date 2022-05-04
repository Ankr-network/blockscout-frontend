import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

import { RootState } from 'store';

interface ITransaction {
  address: string;
  transactionHash: string;
}

export interface IAccountSlice {
  allowanceTransaction?: ITransaction;
  topUpTransaction?: ITransaction;
  amount: BigNumber;
}

const initialState: IAccountSlice = {
  amount: new BigNumber(0),
};

// Need to save transaction states at local storage
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAllowanceTransaction: (
      state,
      action: PayloadAction<IAccountSlice['allowanceTransaction']>,
    ) => {
      state.allowanceTransaction = action.payload;
    },
    setTopUpTransaction: (
      state,
      action: PayloadAction<IAccountSlice['topUpTransaction']>,
    ) => {
      state.topUpTransaction = action.payload;
    },
    setAmount: (state, action: PayloadAction<IAccountSlice['amount']>) => {
      state.amount = action.payload;
    },
  },
});

export const selectAccount = (state: RootState) => state.account;

export const { setAllowanceTransaction, setTopUpTransaction, setAmount } =
  accountSlice.actions;

export const selectTopUpTransaction = createSelector(
  selectAccount,
  state => state.topUpTransaction,
);
