import { persistReducer } from 'redux-persist';
import { PersistState } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { I18nSlice, i18nSlice } from './i18nSlice';

export type Ti18nState = I18nSlice & {
  _persist: PersistState;
};

const persistConfig = {
  key: i18nSlice.name,
  storage,
};

export const i18nPersistReducer = persistReducer(
  persistConfig,
  i18nSlice.reducer,
);
