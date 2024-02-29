// @ts-nocheck
import {
  EventProvider,
  ProviderEvents,
  getProvider,
  EWalletId,
} from '@ankr.com/provider';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

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
import { is2FAError } from 'store/utils/is2FAError';
import { getAxiosAccountingErrorMessage } from 'store/utils/getAxiosAccountingErrorMessage';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';
import { oauthLoginJwt } from 'domains/oauth/actions/loginByGoogleSecretCode/oauthLoginJwt';
import { authAutoConnect } from 'domains/auth/actions/connect/authAutoConnect';
import { createWeb3Service } from 'domains/auth/actions/connect/createWeb3Service';
import { deleteJwtToken } from 'domains/jwtToken/action/deleteJwtToken';
import { resetConfig, selectNewProjectConfig } from 'domains/projects/store';
import { NewProjectStep } from 'domains/projects/types';
import { selectCurrentAddress } from 'domains/auth/store';
import { resetOriginChainURL } from 'domains/chains/store/chainsSlice';
import { isTeamInvitationPath } from 'domains/userSettings/utils/isTeamInvitationPath';
import { getProviderManager } from 'modules/api/getProviderManager';

export const listenerMiddleware = createListenerMiddleware<RootState>();

const getParams = (savedParams: any, totp: string) => {
  if (
    typeof savedParams.params === 'object' &&
    savedParams.params !== null &&
    'params' in savedParams.params
  ) {
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
  matcher: authDisconnect.matchFulfilled,
  effect: async () => {
    const service = await MultiService.getWeb3Service();

    if (service) {
      const providerManager = getProviderManager();
      const ethWeb3KeyProvider = await providerManager.getETHWriteProvider(
        EWalletId.injected,
      );
      const web3 = ethWeb3KeyProvider.getWeb3();

      const provider: EventProvider | null = getProvider(web3?.currentProvider);

      if (provider) {
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
    const providerManager = getProviderManager();
    const ethWeb3KeyProvider = await providerManager.getETHWriteProvider(
      EWalletId.injected,
    );
    const web3 = ethWeb3KeyProvider.getWeb3();

    const provider: EventProvider | null = getProvider(web3?.currentProvider);

    if (provider) {
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
  effect: async (_action, { cancelActiveListeners, dispatch }) => {
    cancelActiveListeners();

    dispatch(resetOriginChainURL());
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
  predicate: (
    action,
    currentState,
    originalState,
  ): action is LocationChangeAction => {
    const isLocationChanged = action.type === LOCATION_CHANGE;

    const { pathname: redirectedFrom } = originalState.router.location;
    const { pathname: redirectedTo } = currentState.router.location;

    const isRedirectedFromTeamInvitation = isTeamInvitationPath(redirectedFrom);
    const isNotRedirectedToTeamInvitation = !isTeamInvitationPath(redirectedTo);

    return (
      isLocationChanged &&
      isRedirectedFromTeamInvitation &&
      isNotRedirectedToTeamInvitation
    );
  },
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
      const message = getAxiosAccountingErrorMessage(error);

      dispatch(setTwoFAErrorMessage(message));
    }
  },
});

listenerMiddleware.startListening({
  matcher: deleteJwtToken.matchFulfilled,
  effect: async (
    {
      meta: {
        arg: { originalArgs = {} },
      },
    },
    { dispatch, getState },
  ) => {
    const deletedTokenIndex = originalArgs?.params?.tokenIndex;

    const { project } = selectNewProjectConfig(getState() as RootState);
    const newProjectTokenIndex = project?.[NewProjectStep.General]?.tokenIndex;

    if (deletedTokenIndex === newProjectTokenIndex) {
      const address = selectCurrentAddress(getState() as RootState);

      dispatch(resetConfig(address));
    }
  },
});
