import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IPaymentsSlice } from '../types';

const isPaymentsSlice = (state: unknown): state is IPaymentsSlice =>
  Boolean(
    state &&
      typeof state === 'object' &&
      'cryptoTransactions' in state &&
      Array.isArray(state.cryptoTransactions),
  );

export const paymentsPersistConfig: PersistConfig<IPaymentsSlice> = {
  key: 'payments',
  storage,
  migrate: state => {
    if (isPaymentsSlice(state)) {
      // to get rid of the transactions that is left after a user has closed
      // the tab on payment flow
      const cryptoTransactions = state.cryptoTransactions.filter(
        tx => tx.depositTxHash,
      );

      return Promise.resolve({ ...state, cryptoTransactions });
    }

    return Promise.resolve(state);
  },
};
