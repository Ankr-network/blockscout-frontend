import { persistReducer } from 'redux-persist';
import { PersistState } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { dashboardSlice, IDashboardSlice } from './dashboardSlice';

export type TDashboardState = IDashboardSlice & {
  _persist: PersistState;
};

const persistConfig = {
  key: dashboardSlice.name,
  storage,
};

export const dashboardPersistReducer = persistReducer(
  persistConfig,
  dashboardSlice.reducer,
);
