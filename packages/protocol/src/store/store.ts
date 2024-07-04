import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import { RootState as RTKQRootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';

import { accountTopUpPersistConfig } from 'domains/account/storage/accountTopUpPersistConfig';
import { accountTopUpSlice } from 'domains/account/store/accountTopUpSlice';
import { authPersistConfig } from 'domains/auth/storage/authPersistConfig';
import { authSlice } from 'domains/auth/store/authSlice';
import { chainsSlice } from 'domains/chains/store/chainsSlice';
import { enterpriseChainsSlice } from 'domains/enterprise/store/enterpriseSlice';
import { guardDialogSlice } from 'modules/guardDialog/store/dialogSlice';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { i18nPersistConfig } from 'modules/i18n/storage/i18nPersistConfig';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { jwtTokenManagerPersistConfig } from 'domains/jwtToken/storage/jwtTokenManagerPersistConfig';
import { jwtTokenManagerSlice } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { newProjectPersistConfig } from 'domains/projects/storage/newProjectPersistConfig';
import { newProjectSlice, projectsSlice } from 'domains/projects/store';
import { newUserGroupPersistConfig } from 'modules/groups/storage/newUserGroupPersistConfig';
import { newUserGroupSlice } from 'modules/groups/store/newUserGroupSlice';
import { notificationSlice } from 'domains/notification/store/notificationSlice';
import { paymentsPersistConfig } from 'modules/payments/storage/paymentsPersistConfig';
import { paymentsSlice } from 'modules/payments/store/paymentsSlice';
import { projectsPersistConfig } from 'domains/projects/storage/projectsPersistConfig';
import { referralProgramPersistConfig } from 'modules/referralProgram/storage/referralProgramPersistConfig';
import { referralProgramSlice } from 'modules/referralProgram/store/referralProgramSlice';
import { requestComposerSlice } from 'domains/requestComposer/store/requestComposerSlice';
import { themePersistConfig } from 'modules/layout/storage/themePersistConfig';
import { themeSlice } from 'modules/layout/store/themeSlice';
import { userGroupPersistConfig } from 'domains/userGroup/storage/userGroupPersistConfig';
import { userGroupSlice } from 'domains/userGroup/store';
import { userSettingsPersistConfig } from 'domains/userSettings/storage/userSettingsPersistConfig';
import { userSettingsSlice } from 'domains/userSettings/store/userSettingsSlice';
import { walletSlice } from 'domains/wallet/store/walletSlice';

import { authConnectInitiatorListenerMiddleware } from './middlewares/authConnectInitiatorListenerMiddleware';
import { listenerMiddleware } from './middlewares/listenerMiddleware';
import { notificationListenerMiddleware } from './middlewares/notificationListenerMiddleware';
import { oauthLoginInitiatorListenerMiddleware } from './middlewares/oauthLoginInitiatorListenerMiddleware';
import { web3Api, projectApi } from './queries';

const rootReducer = combineReducers({
  [web3Api.reducerPath]: web3Api.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  theme: persistReducer(themePersistConfig, themeSlice.reducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  wallet: walletSlice.reducer,
  jwtTokenManager: persistReducer(
    jwtTokenManagerPersistConfig,
    jwtTokenManagerSlice.reducer,
  ),
  accountTopUp: persistReducer(
    accountTopUpPersistConfig,
    accountTopUpSlice.reducer,
  ),
  chainsOriginURL: chainsSlice.reducer,
  enterpriseChains: enterpriseChainsSlice.reducer,
  requestComposer: requestComposerSlice.reducer,
  router: connectRouter(historyInstance),
  notifications: notificationSlice.reducer,
  guardDialog: guardDialogSlice.reducer,
  userGroup: persistReducer(userGroupPersistConfig, userGroupSlice.reducer),
  userSettings: persistReducer(
    userSettingsPersistConfig,
    userSettingsSlice.reducer,
  ),
  projects: persistReducer(projectsPersistConfig, projectsSlice.reducer),
  newProject: persistReducer(newProjectPersistConfig, newProjectSlice.reducer),
  newUserGroup: persistReducer(
    newUserGroupPersistConfig,
    newUserGroupSlice.reducer,
  ),
  payments: persistReducer(paymentsPersistConfig, paymentsSlice.reducer),
  referralProgram: persistReducer(
    referralProgramPersistConfig,
    referralProgramSlice.reducer,
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(web3Api.middleware)
      .concat(projectApi.middleware)
      .prepend(listenerMiddleware.middleware)
      .prepend(authConnectInitiatorListenerMiddleware.middleware)
      .prepend(oauthLoginInitiatorListenerMiddleware.middleware)
      .prepend(notificationListenerMiddleware.middleware)

      .concat(routerMiddleware(historyInstance)),
});

export const persistor = persistStore(store);

export type Store = typeof store;
export type APIState = RTKQRootState<
  EndpointDefinitions,
  string,
  'api' | 'projectApi'
>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type RootState = ReturnType<typeof rootReducer>;
