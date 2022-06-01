import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  INotificationOptions,
  useNotification,
} from 'modules/notifications/hooks/useNotification';
import {
  getDisplayed,
  removeDisplayed,
  storeDisplayed,
} from 'modules/notifications/utils/displayedNotifications';

import {
  hideNotification,
  selectNotificationsData,
} from '../../store/notificationsSlice';

// todo: we should cover this hook with tests
/**
 * https://github.com/iamhosseindhv/notistack#redux-and-mobx-support
 */
export const useNotifier = (): void => {
  const dispatch = useDispatch();
  const notificationsState = useSelector(selectNotificationsData);
  const { showNotification } = useNotification();

  useEffect(() => {
    const notificationsKeys = Object.keys(notificationsState);
    // do nothing if there are no notifications in the store
    if (!notificationsKeys.length) {
      return;
    }

    notificationsKeys.forEach(key => {
      // do nothing if snackbar is already displayed
      if (getDisplayed().includes(key)) {
        return;
      }

      const stateOptions = notificationsState[key];

      const options: INotificationOptions = {
        ...stateOptions,
        onExited: () => {
          // remove this snackbar from redux store
          dispatch(hideNotification(key));
          removeDisplayed(key);
        },
      };

      // display snackbar using notistack
      showNotification(options);

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [dispatch, notificationsState, showNotification]);
};
