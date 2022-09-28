import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { handleRequests, RequestAction } from '@redux-requests/core';
import { createDriver as createPromiseDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from 'connected-react-router';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { configFromEnv } from 'modules/api/config';
import {
  authPersistReducer,
  TAuthState,
} from 'modules/auth/common/store/authPersistReducer';
import { getErrorMessage } from 'modules/common/utils/getErrorMessage';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { dialog, IDialogState } from 'modules/dialogs';
import { formsReducer, IFormsState } from 'modules/forms/store/formsSlice';
import {
  i18nPersistReducer,
  Ti18nState,
} from 'modules/i18n/store/i18nPersistReducer';
import {
  notificationsReducer,
  showNotification,
  TNotificationsState,
} from 'modules/notifications';

import { rootSagas } from './sagas';

export interface IStoreState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requests: any;
  auth: TAuthState;
  dialog: IDialogState;
  forms: IFormsState;
  i18n: Ti18nState;
  notifications: TNotificationsState;
  router: RouterState<unknown>;
}

const { requestsReducer, requestsMiddleware } = handleRequests({
  cache: true,
  driver: {
    default: createPromiseDriver({
      processResponse: response => ({ data: response }),
    }),
    axios: createAxiosDriver(
      axios.create({
        baseURL: configFromEnv().gatewayConfig.baseUrl,
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
  onError: (error: Error, action: RequestAction, store: Store) => {
    if (action.meta?.showNotificationOnError) {
      store.dispatch(
        showNotification({
          key: `${action.type}_ERROR`,
          message: getErrorMessage(error),
          variant: 'error',
        }),
      );
    }

    throw error;
  },
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<IStoreState>({
  auth: authPersistReducer,
  dialog,
  i18n: i18nPersistReducer,
  notifications: notificationsReducer,
  requests: requestsReducer,
  router: connectRouter(historyInstance),
  forms: formsReducer,
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

sagaMiddleware.run(rootSagas);

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
