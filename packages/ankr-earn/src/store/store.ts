import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { handleRequests, RequestAction } from '@redux-requests/core';
import { createDriver as createPromiseDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { configFromEnv } from 'modules/api/config';
import { getErrorMessage } from 'modules/common/utils/getErrorMessage';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { I18nSlice, i18nSlice } from 'modules/i18n/i18nSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistState } from 'redux-persist/es/types';
import createSagaMiddleware from 'redux-saga';
import { NotificationActions } from './actions/NotificationActions';
import { dialog } from './dialogs/reducer';
import { IDialogState } from './dialogs/selectors';
import { ISidecars } from './reducers';
import { notificationReducer } from './reducers/notificationReducer';
import { rootSagas } from './sagas';
import { i18nPersistConfig } from './webStorageConfigs';

export interface IStoreState {
  dialog: IDialogState;
  i18n: I18nSlice & {
    _persist: PersistState;
  };
  notification: any;
  requests: {
    queries: {
      FETCH_CURRENT_PROVIDER_SIDECARS: {
        data: ISidecars;
      };
    };
  };
  router: RouterState<unknown>;
  // user: IUserState; // @TODO Add a logic for this
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
        NotificationActions.showNotification({
          message: getErrorMessage(error),
          severity: 'error',
        }),
      );
    }
    
    throw error;
  },
});

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<IStoreState>({
  dialog,
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  notification: notificationReducer,
  requests: requestsReducer,
  router: connectRouter(historyInstance),
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
