import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { t } from '@ankr.com/common';
import { TwoFAStatus } from 'multirpc-sdk';

import {
  setTwoFAErrorMessage,
  setIsTwoFADialogOpened,
  setTwoFACode,
} from 'domains/userSettings/store/userSettingsSlice';
import { is2FAError } from 'store/utils/is2FAError';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { userSettingsFetchTwoFAStatus } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';
import { authConnectInitiator } from 'domains/auth/actions/connect/connectInitiator';
import { authConnect } from 'domains/auth/actions/connect';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';
import { authDisconnect } from 'domains/auth/actions/disconnect';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const authConnectInitiatorListenerMiddleware =
  createListenerMiddleware();

authConnectInitiatorListenerMiddleware.startListening({
  matcher: isAnyOf(authConnectInitiator.matchFulfilled),
  effect: async (
    {
      meta: {
        arg: { originalArgs: params },
      },
    },
    { take, dispatch },
  ) => {
    let totp = '';

    const { error: connectError } = await dispatch(
      authConnect.initiate(params),
    );

    if (connectError) {
      dispatch(authDisconnect.initiate());

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

          dispatch(authDisconnect.initiate());
        }
      });

      [{ payload: totp }] = await take(setTwoFACode.match);

      dispatch(setIsTwoFADialogOpened(false));
    }

    const { error } = await dispatch(
      authMakeAuthorization.initiate({ ...params, totp }),
    );

    if (is2FAError(error)) {
      const message = getAxiosAccountErrorMessage(error);

      dispatch(setTwoFAErrorMessage(message));
    }

    if (error && !is2FAError(error)) {
      dispatch(authDisconnect.initiate());
    }
  },
});
