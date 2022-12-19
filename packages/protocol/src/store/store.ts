import { capitalize } from '@material-ui/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { createDriver as createPromiseDriver } from '@redux-requests/promise';
import { handleRequests } from '@redux-requests/core';
import { persistReducer, persistStore } from 'redux-persist';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';

import { accountTopUpPersistConfig } from 'domains/account/storage/accountTopUpPersistConfig';
import { accountTopUpSlice } from 'domains/account/store/accountTopUpSlice';
import { authPersistConfig } from 'domains/auth/storage/authPersistConfig';
import { authSlice } from 'domains/auth/store/authSlice';
import { chainsSlilce } from 'domains/chains/store/chainsSlice';
import { disconnect } from 'domains/auth/actions/disconnect';
import { extractMessage } from '../modules/common/utils/extractError';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { i18nPersistConfig } from 'modules/i18n/storage/i18nPersistConfig';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { isAxiosAccountEmailError } from './utils/isAxiosAccountEmailError';
import { isAxiosAccountError } from './utils/isAxiosAccountError';
import { isAxiosAuthError } from './utils/isAxiosAuthError';
import { NotificationActions } from '../domains/notification/store/NotificationActions';
import { notificationSlice } from '../domains/notification/store/notificationSlice';
import { requestComposerSlice } from 'domains/requestComposer/store/requestComposerSlice';
import { rootSaga } from './rootSaga';

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
    const shouldNotify =
      !isAxiosAccountEmailError(error) && !action.meta?.hideNotificationOnError;

    if (shouldNotify) {
      let message = extractMessage(error);

      if (isAxiosAuthError(error)) {
        store.dispatch(disconnect());

        message = extractMessage(error.response?.data, 'error.expired-session');
      }

      if (isAxiosAccountError(error)) {
        message = capitalize(error.response?.data.error.message ?? message);
      }

      store.dispatch(
        NotificationActions.showNotification({ message, severity: 'error' }),
      );
    }

    throw error;
  },
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  accountTopUp: persistReducer(
    accountTopUpPersistConfig,
    accountTopUpSlice.reducer,
  ),
  chainsOriginURL: chainsSlilce.reducer,
  requestComposer: requestComposerSlice.reducer,
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
