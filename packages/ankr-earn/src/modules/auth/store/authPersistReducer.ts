import { persistReducer } from 'redux-persist';
import { PersistState } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { authSlice, IAuthSlice } from './authSlice';

export type TAuthState = IAuthSlice & {
  _persist: PersistState;
};

const persistConfig = {
  key: authSlice.name,
  storage,
};

export const authPersistReducer = persistReducer(
  persistConfig,
  authSlice.reducer,
);
