import { EventProvider, ProviderEvents } from '@ankr.com/provider';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { MultiService } from 'modules/api/MultiService';
import { authConnect } from 'domains/auth/actions/connect';
import { authDisconnect } from 'domains/auth/actions/disconnect';
import { disconnectService } from 'domains/auth/actions/connect/connectUtils';
import { isAuthRejectedAction } from 'store/matchers/isAuthRejectedAction';
import { usdTopUpWatchForTheFirstCardPayment } from 'domains/account/actions/usdTopUp/watchForTheFirstCardPayment';
import { watchForDepositOrVoucherTransation } from 'domains/oauth/actions/watchForDepositOrVoucherTransation';
import { oauthAutoLogin } from 'domains/oauth/actions/autoLogin';
import { oauthSignout } from 'domains/oauth/actions/signout';
import { watchForVoucherTransactionAndNegativeBalance } from 'domains/oauth/actions/watchForVoucherTransactionAndNegativeBalance';
import { oauthLoginByGoogleSecretCode } from 'domains/oauth/actions/loginByGoogleSecretCode';

export const listenerMiddleware = createListenerMiddleware();

const isProvider = (provider: unknown): provider is EventProvider =>
  !!provider && typeof provider === 'object' && 'on' in provider;

listenerMiddleware.startListening({
  matcher: isAuthRejectedAction,
  effect: async (_action, { dispatch }) => {
    dispatch(authDisconnect.initiate());
  },
});

listenerMiddleware.startListening({
  matcher: authConnect.matchFulfilled,
  effect: async (_action, { dispatch }) => {
    dispatch(usdTopUpWatchForTheFirstCardPayment.initiate());
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    oauthLoginByGoogleSecretCode.matchFulfilled,
    oauthAutoLogin.matchFulfilled,
    authConnect.matchFulfilled,
  ),
  effect: async (_action, { dispatch }) => {
    dispatch(watchForDepositOrVoucherTransation.initiate());
    dispatch(watchForVoucherTransactionAndNegativeBalance.initiate());
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
  matcher: authConnect.matchFulfilled,
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
