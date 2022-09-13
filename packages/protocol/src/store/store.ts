import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { handleRequests } from '@redux-requests/core';
import { createDriver as createPromiseDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { accountTopUpPersistConfig } from 'domains/account/storage/accountTopUpPersistConfig';
import { accountWithdrawPersistConfig } from 'domains/account/storage/accountWithdrawPersistConfig';
import { accountTopUpSlice } from 'domains/account/store/accountTopUpSlice';
import { accountWithdrawSlice } from 'domains/account/store/accountWithdrawSlice';
import { disconnect } from 'domains/auth/actions/disconnect';
import { authPersistConfig } from 'domains/auth/storage/authPersistConfig';
import { authSlice } from 'domains/auth/store/authSlice';
import { userSettingsDisabledBannersPersistConfig } from 'domains/userSettings/storage/userSettingsDisabledBannersPersistConfig';
import { userSettingsDisabledBannersSlice } from 'domains/userSettings/store/userSettingsDisabledBannersSlice';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { i18nPersistConfig } from 'modules/i18n/storage/i18nPersistConfig';
import { NotificationActions } from '../domains/notification/store/NotificationActions';
import { notificationSlice } from '../domains/notification/store/notificationSlice';
import { extractMessage } from '../modules/common/utils/extractError';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { rootSaga } from './rootSaga';
import { requestComposerSlice } from 'domains/requestComposer/store/requestComposerSlice';

const TOKEN_EXPIRED_ERROR = 'this token has already expired';
const TOKEN_AUTH_ERROR = 'Auth token is not provided or malformed';

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

    if (
      error?.response?.data === TOKEN_EXPIRED_ERROR ||
      error?.response?.data === TOKEN_AUTH_ERROR
    ) {
      store.dispatch(disconnect());

      customMessageKey = 'error.expired-session';
    }

    if (!action.meta?.hideNotificationOnError) {
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
  accountTopUp: persistReducer(
    accountTopUpPersistConfig,
    accountTopUpSlice.reducer,
  ),
  accountWithdraw: persistReducer(
    accountWithdrawPersistConfig,
    accountWithdrawSlice.reducer,
  ),
  userSettingsDisabledBanners: persistReducer(
    userSettingsDisabledBannersPersistConfig,
    userSettingsDisabledBannersSlice.reducer,
  ),
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
