import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { handleRequests } from '@redux-requests/core';
import { createDriver as createPromiseDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { i18nSlice } from 'modules/i18n/i18nSlice';
import { extractMessage } from '../modules/common/utils/extractError';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { NotificationActions } from '../domains/notification/store/NotificationActions';
import { notificationSlice } from '../domains/notification/store/notificationSlice';
import { rootSaga } from './rootSaga';
import { i18nPersistConfig, authPersistConfig } from './webStorageConfigs';
import { authSlice } from 'modules/auth/store/authSlice';
import { accountSlice } from 'domains/account/store/accountSlice';
import { disconnect } from 'modules/auth/actions/disconnect';
import { accountPersistConfig } from 'domains/account/storage/accountPersistConfig';

const TOKEN_EXPIRED_ERROR = 'this token has already expired';

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
  onError: (error: any, action, store: Store) => {
    let customMessageKey = '';

    if (error?.response?.data === TOKEN_EXPIRED_ERROR) {
      store.dispatch(disconnect());

      customMessageKey = 'error.expired-session';
    }

    if (!action.meta?.suppressErrorNotification) {
      store.dispatch(
        NotificationActions.showNotification({
          message: extractMessage(error, customMessageKey),
          severity: 'error',
        }),
      );
    }

    throw error;
  },
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  account: persistReducer(accountPersistConfig, accountSlice.reducer),
  requests: requestsReducer,
  router: connectRouter(historyInstance),
  notifications: notificationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...requestsMiddleware,
    routerMiddleware(historyInstance),
    sagaMiddleware,
  ],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
