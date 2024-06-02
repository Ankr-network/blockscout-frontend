import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ICreateCryptoTxPayload,
  ICreateFiatTxPayload,
  ICryptoTransaction,
  IPaymentsSlice,
  ISetAllowanceAmountPayload,
  ISetAllowanceErrorPayload,
  ISetAllowanceFeeDetailsEstimatedPayload,
  ISetAllowanceFeeDetailsPaidPayload,
  ISetAllowanceTxHashPayload,
  ISetDepositErrorPayload,
  ISetDepositFeeDetailsEstimatedPayload,
  ISetDepositFeeDetailsPaidPayload,
  ISetDepositTxHashPayload,
  ISetFromAddressPayload,
  ISetIsAllowanceConfirmingPayload,
  ISetIsApprovedPayload,
  ISetIsApprovingPayload,
  ISetIsConfirmedPayload,
  ISetIsDepositConfirmingPayload,
  ISetIsDepositingPayload,
  IUpdateCryptoTxPayload,
} from '../types';
import { updateCryptoTx } from '../utils/updateCryptoTx';

const initialState: IPaymentsSlice = {
  cryptoTransactions: [],
  fiatTransaction: undefined,
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    createCryptoTx: (state, action: PayloadAction<ICreateCryptoTxPayload>) => {
      const { payload } = action;
      const isApproved = payload.hadAllowance;

      const tx: ICryptoTransaction = { isApproved, ...payload };

      state.cryptoTransactions.push(tx);
    },
    createFiatTx: (state, action: PayloadAction<ICreateFiatTxPayload>) => {
      state.fiatTransaction = action.payload;
    },
    removeCryptoTx: (state, action: PayloadAction<IUpdateCryptoTxPayload>) => {
      state.cryptoTransactions = state.cryptoTransactions.filter(
        tx => tx.id === action.payload.id,
      );
    },
    removeFiatTx: state => {
      state.fiatTransaction = initialState.fiatTransaction;
    },
    setAllowanceAmount: (
      state,
      action: PayloadAction<ISetAllowanceAmountPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setAllowanceError: (
      state,
      action: PayloadAction<ISetAllowanceErrorPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setAllowanceFeeDetailsEstimated: (
      state,
      action: PayloadAction<ISetAllowanceFeeDetailsEstimatedPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setAllowanceFeeDetailsPaid: (
      state,
      action: PayloadAction<ISetAllowanceFeeDetailsPaidPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setAllowanceTxHash: (
      state,
      action: PayloadAction<ISetAllowanceTxHashPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setDepositError: (
      state,
      action: PayloadAction<ISetDepositErrorPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setDepositFeeDetailsEstimated: (
      state,
      action: PayloadAction<ISetDepositFeeDetailsEstimatedPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setDepositFeeDetailsPaid: (
      state,
      action: PayloadAction<ISetDepositFeeDetailsPaidPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setDepositTxHash: (
      state,
      action: PayloadAction<ISetDepositTxHashPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setFromAddress: (state, action: PayloadAction<ISetFromAddressPayload>) => {
      updateCryptoTx({ action, state });
    },
    setIsAllowanceConfirming: (
      state,
      action: PayloadAction<ISetIsAllowanceConfirmingPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setIsApproved: (state, action: PayloadAction<ISetIsApprovedPayload>) => {
      updateCryptoTx({ action, state });
    },
    setIsApproving: (state, action: PayloadAction<ISetIsApprovingPayload>) => {
      updateCryptoTx({ action, state });
    },
    setIsConfirmed: (state, action: PayloadAction<ISetIsConfirmedPayload>) => {
      updateCryptoTx({ action, state });
    },
    setIsDepositConfirming: (
      state,
      action: PayloadAction<ISetIsDepositConfirmingPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    setIsDepositing: (
      state,
      action: PayloadAction<ISetIsDepositingPayload>,
    ) => {
      updateCryptoTx({ action, state });
    },
    reset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  createCryptoTx,
  createFiatTx,
  removeCryptoTx,
  removeFiatTx,
  reset,
  setAllowanceAmount,
  setAllowanceError,
  setAllowanceFeeDetailsEstimated,
  setAllowanceFeeDetailsPaid,
  setAllowanceTxHash,
  setDepositError,
  setDepositFeeDetailsEstimated,
  setDepositFeeDetailsPaid,
  setDepositTxHash,
  setFromAddress,
  setIsAllowanceConfirming,
  setIsApproved,
  setIsApproving,
  setIsConfirmed,
  setIsDepositConfirming,
  setIsDepositing,
} = paymentsSlice.actions;
