import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { t } from '@ankr.com/common';
import { TwoFAStatus } from 'multirpc-sdk';

import { oauthLoginByGoogleSecretCode } from 'domains/oauth/actions/loginByGoogleSecretCode';
import {
  setTwoFAErrorMessage,
  setIsTwoFADialogOpened,
  setTwoFACode,
} from 'domains/userSettings/store/userSettingsSlice';
import { is2FAError } from 'store/utils/is2FAError';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { oauthLoginInitiator } from 'domains/oauth/actions/loginByGoogleSecretCode/loginInitiator';
import { oauthLoginJwt } from 'domains/oauth/actions/loginByGoogleSecretCode/oauthLoginJwt';
import { userSettingsFetchTwoFAStatus } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';
import { oauthSignout } from 'domains/oauth/actions/signout';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const oauthLoginInitiatorListenerMiddleware = createListenerMiddleware();

oauthLoginInitiatorListenerMiddleware.startListening({
  matcher: isAnyOf(oauthLoginInitiator.matchFulfilled),
  effect: async (
    {
      meta: {
        arg: { originalArgs: params },
      },
    },
    { take, dispatch },
  ) => {
    let totp = '';

    const { error: secretCodeError } = await dispatch(
      oauthLoginByGoogleSecretCode.initiate(),
    );

    if (secretCodeError) {
      dispatch(
        NotificationActions.showNotification({
          message: t('oauth.secret-code-error'),
          severity: 'error',
        }),
      );

      dispatch(oauthSignout.initiate());
      dispatch(push(ChainsRoutesConfig.chains.generatePath()));

      return;
    }

    const { data: { status } = { status: TwoFAStatus.None } } = await dispatch(
      userSettingsFetchTwoFAStatus.initiate(),
    );

    if (status === TwoFAStatus.Enabled) {
      dispatch(setIsTwoFADialogOpened(true));

      // if user closed 2fa without entering the code we should redirect him
      take(setIsTwoFADialogOpened.match).then(data => {
        if (!data?.[0]?.payload && !totp) {
          dispatch(
            NotificationActions.showNotification({
              message: t('error.two-fa'),
              severity: 'error',
            }),
          );

          dispatch(oauthSignout.initiate());
          dispatch(push(ChainsRoutesConfig.chains.generatePath()));
        }
      });

      [{ payload: totp }] = await take(setTwoFACode.match);

      dispatch(setIsTwoFADialogOpened(false));
    }

    const { error } = await dispatch(
      oauthLoginJwt.initiate({ ...params, totp }),
    );

    if (is2FAError(error)) {
      const message = getAxiosAccountErrorMessage(error);
      dispatch(setTwoFAErrorMessage(message));
    }

    if (error && !is2FAError(error)) {
      dispatch(oauthSignout.initiate());
    }
  },
});
