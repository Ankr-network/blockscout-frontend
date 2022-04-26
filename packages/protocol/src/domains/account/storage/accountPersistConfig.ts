import BigNumber from 'bignumber.js';
import storage from 'redux-persist/lib/storage';

export const accountPersistConfig = {
  key: 'account',
  storage,
  migrate: (state = { amount: 0 } as any) => {
    return Promise.resolve({ ...state, amount: new BigNumber(state.amount) });
  },
};
