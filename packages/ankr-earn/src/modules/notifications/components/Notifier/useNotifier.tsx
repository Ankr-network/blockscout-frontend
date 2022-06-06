import { OptionsObject, useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getDisplayed,
  removeDisplayed,
  storeDisplayed,
} from 'modules/notifications/utils/displayedNotifications';

import {
  hideNotification,
  selectNotificationsData,
} from '../../store/notificationsSlice';
import { NotificationClose } from '../NotificationClose';

// todo: we should cover this hook with tests
/**
 * https://github.com/iamhosseindhv/notistack#redux-and-mobx-support
 */
export const useNotifier = (): void => {
  const dispatch = useDispatch();
  const notificationsState = useSelector(selectNotificationsData);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

      const { message, ...stateOptions } = notificationsState[key];

      const options: OptionsObject = {
        ...stateOptions,
        action: id => <NotificationClose onClick={() => closeSnackbar(id)} />,
        onExited: (_, myKey) => {
          // remove this snackbar from redux store
          dispatch(hideNotification(myKey));
          removeDisplayed(myKey);
        },
      };

      // display snackbar using notistack
      enqueueSnackbar(message, options);

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [closeSnackbar, dispatch, enqueueSnackbar, notificationsState]);
};
