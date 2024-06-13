import { queryFnWrapper } from '@ankr.com/utils';
import * as Sentry from '@sentry/react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { extractMessage } from 'modules/common/utils/extractError';
import { INotificationProps } from 'domains/notification/store/notificationSlice';
import {
  selectUserGroupConfig,
  selectUserGroupConfigByAddress,
} from 'domains/userGroup/store';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { getAxiosAccountingErrorMessage } from './getAxiosAccountingErrorMessage';
import { getParsedErrorMessage } from './getParsedErrorMessage';
import { is2FAError } from './is2FAError';
import { isAxiosAccountEmailError } from './isAxiosAccountingEmailError';
import { isAxiosAccountingError } from './isAxiosAccountingError';
import { isAxiosAuthError } from './isAxiosAuthError';
import { isAxiosPermissionError } from './isAxiosPermissionError';
import { isCustomError } from './isCustomError';
import { RootState } from 'store/store';

export const makeNotification = (
  error: unknown,
  dispatch: any,
  notificationOptions?: Partial<INotificationProps>,
) => {
  let message = extractMessage(error);

  if (isAxiosAuthError(error)) {
    message = extractMessage(error.response?.data, 'error.expired-session');
  }

  if (isAxiosPermissionError(error)) {
    message = extractMessage(error.response?.data, 'error.permission');
  }

  if (isAxiosAccountingError(error)) {
    message = getAxiosAccountingErrorMessage(error);
  }

  if (getParsedErrorMessage(error)) {
    message = getParsedErrorMessage(error);
  }

  dispatch(
    NotificationActions.showNotification({
      message,
      severity: 'error',
      ...(notificationOptions || {}),
    }),
  );
};

export const shouldNotify = (error: unknown) => {
  return (
    (!isAxiosAccountEmailError(error) || is2FAError(error)) &&
    !isCustomError(error)
  );
};

export const createNotifyingQueryFn = queryFnWrapper({
  onNotification({ api: { dispatch }, error }) {
    if (shouldNotify(error)) {
      makeNotification(error, dispatch);
    }
  },
});

export const createWeb3NotifyingQueryFn = queryFnWrapper({
  onNotification({ api: { dispatch, getState }, error }) {
    const groupsConfig = selectUserGroupConfig(getState() as RootState);
    const groupConfig = selectUserGroupConfigByAddress(getState() as RootState);
    const authData = selectAuthData(getState() as RootState);

    Sentry.setContext('groupsConfig', groupsConfig);
    Sentry.setContext('groupConfig', groupConfig);
    Sentry.setContext('authData', {
      authAddress: authData.authAddress,
      authAddressType: authData.authAddressType,
      email: authData.email,
      hasOauthLogin: authData.hasOauthLogin,
      hasWeb3Autoconnect: authData.hasWeb3Autoconnect,
      hasWeb3Connection: authData.hasWeb3Connection,
      isCardPayment: authData.isCardPayment,
      isInstantJwtParticipant: authData.isInstantJwtParticipant,
      loginName: authData.loginName,
      oauthProviders: authData.oauthProviders,
    });
    Sentry.captureException(error);

    if (shouldNotify(error)) {
      makeNotification(error, dispatch);
    }
  },
});
