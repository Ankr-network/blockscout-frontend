import { EventProvider, ProviderEvents } from '@ankr.com/provider';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authDisconnect } from 'domains/auth/actions/disconnect';
import { disconnectService } from 'domains/auth/actions/connect/connectUtils';
import { getEndpointByName } from 'store/utils/getEndpointByName';
import { is2FARejectedAction } from 'store/matchers/is2FARejectedAction';
import { isAuthRejectedAction } from 'store/matchers/isAuthRejectedAction';
import { oauthAutoLogin } from 'domains/oauth/actions/autoLogin';
import { oauthSignout } from 'domains/oauth/actions/signout';
import {
  setTwoFAErrorMessage,
  setIsTwoFADialogOpened,
  setTwoFACode,
  setTwoFAEndpoint,
  selectTwoFAEndpoint,
} from 'domains/userSettings/store/userSettingsSlice';
import { shouldShowUserGroupDialog } from 'domains/userGroup/actions/shouldShowUserGroupDialog';
import { usdTopUpWatchForTheFirstCardPayment } from 'domains/account/actions/usdTopUp/watchForTheFirstCardPayment';
import { watchForDepositOrVoucherTransation } from 'domains/oauth/actions/watchForDepositOrVoucherTransation';
import { watchForVoucherTransactionAndNegativeBalance } from 'domains/oauth/actions/watchForVoucherTransactionAndNegativeBalance';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';
import { is2FAError } from 'store/utils/is2FAError';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';
import { oauthLoginJwt } from 'domains/oauth/actions/loginByGoogleSecretCode/oauthLoginJwt';
import { authAutoConnect } from 'domains/auth/actions/connect/authAutoConnect';
import { createWeb3Service } from 'domains/auth/actions/connect/createWeb3Service';

export const listenerMiddleware = createListenerMiddleware();

const isProvider = (provider: unknown): provider is EventProvider =>
  !!provider && typeof provider === 'object' && 'on' in provider;

const getParams = (savedParams: any, totp: string) => {
  if ('params' in savedParams?.params) {
    return {
      ...savedParams,
      params: {
        ...savedParams.params,
        totp,
      },
    };
  }

  return {
    ...savedParams,
    totp,
  };
};

listenerMiddleware.startListening({
  matcher: isAuthRejectedAction,
  effect: async (_action, { dispatch }) => {
    dispatch(authDisconnect.initiate());
  },
});

listenerMiddleware.startListening({
  matcher: authMakeAuthorization.matchFulfilled,
  effect: async (_action, { dispatch }) => {
    dispatch(usdTopUpWatchForTheFirstCardPayment.initiate());
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    oauthLoginJwt.matchFulfilled,
    oauthAutoLogin.matchFulfilled,
    authMakeAuthorization.matchFulfilled,
  ),
  effect: async (_action, { dispatch, getState }) => {
    const { selectedGroupAddress: group, selectedGroupRole: userGroupRole } =
      getSelectedGroupAddress(getState() as RootState);

    dispatch(
      watchForDepositOrVoucherTransation.initiate({ userGroupRole, group }),
    );
    dispatch(watchForVoucherTransactionAndNegativeBalance.initiate({ group }));
  },
});

listenerMiddleware.startListening({
  matcher: authDisconnect.matchFulfilled,
  effect: async () => {
    const service = await MultiService.getWeb3Service();

    if (service) {
      const provider = service.getKeyProvider().getWeb3().currentProvider;

      service.getKeyProvider().disconnect();

      if (isProvider(provider)) {
        provider.removeAllListeners(ProviderEvents.AccountsChanged);
        provider.removeAllListeners(ProviderEvents.ChainChanged);
        provider.removeAllListeners(ProviderEvents.Disconnect);
      }
    }

    disconnectService();
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(createWeb3Service.matchFulfilled),
  effect: async (_action, { dispatch }) => {
    const service = await MultiService.getWeb3Service();
    const provider = service.getKeyProvider().getWeb3().currentProvider;

    if (isProvider(provider)) {
      const handler = () => {
        dispatch(authDisconnect.initiate());
      };

      provider.on(ProviderEvents.AccountsChanged, handler);
      provider.on(ProviderEvents.ChainChanged, handler);
      provider.on(ProviderEvents.Disconnect, handler);
    }
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(authDisconnect.matchFulfilled, oauthSignout.matchFulfilled),
  effect: async (_action, { cancelActiveListeners }) => {
    cancelActiveListeners();
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    authMakeAuthorization.matchFulfilled,
    authAutoConnect.matchFulfilled,
    oauthLoginJwt.matchFulfilled,
    oauthAutoLogin.matchFulfilled,
  ),
  effect: async (_action, { dispatch }) => {
    dispatch(shouldShowUserGroupDialog.initiate());
  },
});

listenerMiddleware.startListening({
  matcher: is2FARejectedAction,
  effect: async (
    {
      meta: {
        arg: { endpointName, originalArgs: params = {} },
      },
    },
    { take, dispatch, getState },
  ) => {
    dispatch(setIsTwoFADialogOpened(true));
    // we need to use saved endpoint name for every iteration of listener
    dispatch(setTwoFAEndpoint({ endpointName, params }));

    const [{ payload: totp }] = await take(setTwoFACode.match);

    const { endpointName: savedEndpointName, params: savedParams = {} } =
      selectTwoFAEndpoint(getState() as RootState) || {};

    dispatch(setIsTwoFADialogOpened(false));

    const { error } = await dispatch(
      getEndpointByName(savedEndpointName || endpointName).initiate(
        getParams(savedParams, totp),
      ),
    );

    if (is2FAError(error)) {
      const message = getAxiosAccountErrorMessage(error);
      dispatch(setTwoFAErrorMessage(message));
    }
  },
});
