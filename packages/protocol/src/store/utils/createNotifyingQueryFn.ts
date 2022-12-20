import { capitalize } from '@material-ui/core';
import { queryFnWrapper } from '@ankr.com/utils';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { extractMessage } from 'modules/common/utils/extractError';
import { isAxiosAccountEmailError } from './isAxiosAccountEmailError';
import { isAxiosAccountError } from './isAxiosAccountError';
import { isAxiosAuthError } from './isAxiosAuthError';

export const createNotifyingQueryFn = queryFnWrapper({
  onNotification({ api: { dispatch }, error }) {
    const shouldNotify = !isAxiosAccountEmailError(error);

    if (shouldNotify) {
      let message = extractMessage(error);

      if (isAxiosAuthError(error)) {
        message = extractMessage(error.response?.data, 'error.expired-session');
      }

      if (isAxiosAccountError(error)) {
        message = capitalize(error.response?.data.error.message ?? message);
      }

      dispatch(
        NotificationActions.showNotification({ message, severity: 'error' }),
      );
    }
  },
});
