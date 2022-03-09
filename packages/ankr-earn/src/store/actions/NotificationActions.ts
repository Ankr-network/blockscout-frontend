import { Action } from 'redux-actions';

import { createAction } from 'modules/common/utils/redux/createAction';

import type { INotificationProps } from '../reducers/notificationReducer';

const NotificationActionsTypes = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  PUSH_NOTIFICATION_TO_THE_QUEUE: 'PUSH_NOTIFICATION_TO_THE_QUEUE',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

const NotificationActions = {
  showNotification: (() => {
    let key = 0;
    return (notification: INotificationProps) => {
      key += 1;

      return createAction(NotificationActionsTypes.SHOW_NOTIFICATION, {
        key,
        ...notification,
      });
    };
  })(),

  pushNotificationToTheQueue: (
    notification: INotificationProps,
  ): Action<INotificationProps> =>
    createAction(
      NotificationActionsTypes.PUSH_NOTIFICATION_TO_THE_QUEUE,
      notification,
    ) as Action<INotificationProps>,

  hideNotification: (key: string): Action<string> =>
    createAction(
      NotificationActionsTypes.HIDE_NOTIFICATION,
      key,
    ) as Action<string>,
};

export { NotificationActionsTypes, NotificationActions };
