import { createListenerMiddleware } from '@reduxjs/toolkit';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  INotificationProps,
  notificationSlice,
} from 'domains/notification/store/notificationSlice';
import { EMilliSeconds } from 'modules/common/constants/const';

const NOTIFICATION_AUTO_HIDE_DURATION = EMilliSeconds.Second * 5;

export const notificationListenerMiddleware = createListenerMiddleware();

notificationListenerMiddleware.startListening({
  actionCreator: NotificationActions.showNotification,
  effect: async ({ payload }, { dispatch }) => {
    const { autoHideDuration } = payload;

    const notification: INotificationProps = {
      ...payload,
    };

    dispatch(
      notificationSlice.actions.pushNotificationToTheQueue(notification),
    );

    // in case if autoHideDuration is equal to null,
    // notification shouldn't be closed automatically
    if (autoHideDuration !== null) {
      setTimeout(
        () =>
          dispatch(
            notificationSlice.actions.hideNotification(notification.key),
          ),
        autoHideDuration || NOTIFICATION_AUTO_HIDE_DURATION,
      );
    }
  },
});
