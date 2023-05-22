import { queryFnWrapper } from '@ankr.com/utils';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { extractMessage } from 'modules/common/utils/extractError';
import { getAxiosAccountErrorMessage } from './getAxiosAccountErrorMessage';
import { is2FAError } from './is2FAError';
import { isAxiosAccountEmailError } from './isAxiosAccountEmailError';
import { isAxiosAccountError } from './isAxiosAccountError';
import { isAxiosAuthError } from './isAxiosAuthError';
import { isAxiosPermissionError } from './isAxiosPermissionError';
import { INotificationProps } from 'domains/notification/store/notificationSlice';

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

  if (isAxiosAccountError(error)) {
    message = getAxiosAccountErrorMessage(error);
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
  return !isAxiosAccountEmailError(error) || is2FAError(error);
};

export const createNotifyingQueryFn = queryFnWrapper({
  onNotification({ api: { dispatch }, error }) {
    if (shouldNotify(error)) {
      makeNotification(error, dispatch);
    }
  },
});
