import createSagaMiddleware from 'redux-saga';
import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import { RootState as RTKQRootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';

import { accountTopUpPersistConfig } from 'domains/account/storage/accountTopUpPersistConfig';
import { accountTopUpSlice } from 'domains/account/store/accountTopUpSlice';
import { authPersistConfig } from 'domains/auth/storage/authPersistConfig';
import { authSlice } from 'domains/auth/store/authSlice';
import { chainsSlilce } from 'domains/chains/store/chainsSlice';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { i18nPersistConfig } from 'modules/i18n/storage/i18nPersistConfig';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { listenerMiddleware } from './middlewares/listenerMiddleware';
import { notificationSlice } from '../domains/notification/store/notificationSlice';
import { requestComposerSlice } from 'domains/requestComposer/store/requestComposerSlice';
import { rootSaga } from './rootSaga';
import { web3Api } from './queries';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  [web3Api.reducerPath]: web3Api.reducer,
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  accountTopUp: persistReducer(
    accountTopUpPersistConfig,
    accountTopUpSlice.reducer,
  ),
  chainsOriginURL: chainsSlilce.reducer,
  requestComposer: requestComposerSlice.reducer,
  router: connectRouter(historyInstance),
  notifications: notificationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(web3Api.middleware)
      .prepend(listenerMiddleware.middleware)
      .concat(sagaMiddleware)
      .concat(routerMiddleware(historyInstance)),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type Store = typeof store;
export type APIState = RTKQRootState<EndpointDefinitions, string, 'api'>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type RootState = ReturnType<GetState>;
