import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { MultiService } from 'modules/api/MultiService';

import { RootState } from 'store';

interface ITransaction {
  withdrawTransactionHash?: string;
  amount?: BigNumber;
}

type Address = string;

interface ISetTransactionPayload extends ITransaction {
  address: Address;
}

const initialState: IAccountSlice = {};

export type IAccountSlice = Record<Address, ITransaction>;

// Need to save transaction states at local storage
export const accountWithdrawSlice = createSlice({
  name: 'account/withdraw',
  initialState,
  reducers: {
    setWithdrawTransaction: (
      state,
      action: PayloadAction<ISetTransactionPayload>,
    ) => {
      state[action.payload.address] = {
        ...state[action.payload.address],
        withdrawTransactionHash: action.payload.withdrawTransactionHash,
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
): ITransaction | undefined => state.accountWithdraw[address];

export const selectTransaction = (
  state: RootState,
): ITransaction | undefined => {
  const { service } = MultiService.getInstance();
  const address = service.getKeyProvider().currentAccount();

  return state.accountWithdraw[address];
};

export const { setWithdrawTransaction, setAmount, resetTransaction } =
  accountWithdrawSlice.actions;
