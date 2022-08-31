import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import { queryErrorLogger } from './errorMiddleware';
import { i18nPersistConfig } from 'modules/i18n/storage/i18nPersistConfig';
import { i18nSlice } from 'modules/i18n/i18nSlice';

const rootReducer = combineReducers({
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // TODO: fix serializable error
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: false,
    }).concat(queryErrorLogger),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
