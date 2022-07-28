import {
  RequestAction,
  RequestActionMeta,
  RequestsStore,
} from '@redux-requests/core';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { EmailErrorMessage, IEmailResponse } from 'multirpc-sdk';

const emailErrorSet = new Set(Object.values(EmailErrorMessage));

export const getEmailErrorConfig = (): {
  hideNotificationOnError: RequestActionMeta<
    any,
    any
  >['hideNotificationOnError'];
  onError: RequestActionMeta<any, any>['onError'];
} => ({
  hideNotificationOnError: true,
  onError: (error, _action: RequestAction, store: RequestsStore) => {
    const emailError = error?.response?.data?.error as IEmailResponse['error'];

    const isEmailError = emailError && emailErrorSet.has(emailError.message);

    if (!isEmailError) {
      store.dispatch(
        NotificationActions.showNotification({
          message: error.message,
          severity: 'error',
        }),
      );
    }
    throw error;
  },
});
