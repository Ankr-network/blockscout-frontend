import BigNumber from 'bignumber.js';
import { PersistedState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const accountTopUpPersistConfig = {
  key: 'account/topUp',
  storage,
  migrate: (state = {} as any) => {
    Object.keys(state).forEach(address => {
      state[address] =
        address === 'topUpOrigin'
          ? state[address]
          : {
              ...state[address],
              isProcessing: false,
              amount: new BigNumber(state[address]?.amount ?? 0),
            };
    });

    return Promise.resolve(state as PersistedState);
  },
};
