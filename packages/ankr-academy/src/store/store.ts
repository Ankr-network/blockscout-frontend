import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { handleRequests } from '@redux-requests/core';
import { createDriver as createPromiseDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';

import { i18nSlice } from 'modules/i18n/i18nSlice';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { i18nPersistConfig } from './webStorageConfigs';

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: {
    default: createPromiseDriver({
      processResponse: response => ({ data: response }),
    }),
    axios: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_API_BASE || '',
      }),
    ),
  },
  onRequest: (request, action) => {
    if (action.meta?.auth) {
      return {
        ...request,
        headers: {
          ...request.headers,
        },
      };
    }

    return request;
  },
  onError: (error: Error, action) => {
    if (!action.meta?.suppressErrorNotification) {
      // TODO: show notification
    }

    throw error;
  },
});

const rootReducer = combineReducers({
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  requests: requestsReducer,
  router: connectRouter(historyInstance),
  // TODO: notifications
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...requestsMiddleware, routerMiddleware(historyInstance)],
});

export const persistor = persistStore(store);

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
