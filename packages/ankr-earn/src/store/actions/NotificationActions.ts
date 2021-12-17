import { INotificationProps } from '../reducers/notificationReducer';
import { createAction } from '../utils/createAction';

const NotificationActionsTypes = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  PUSH_NOTIFICATION_TO_THE_QUEUE: 'PUSH_NOTIFICATION_TO_THE_QUEUE',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

const NotificationActions = {
  showNotification: (() => {
    let key = 0;
    return (notification: INotificationProps) =>
      createAction(NotificationActionsTypes.SHOW_NOTIFICATION, {
        key: ++key,
        ...notification,
      });
  })(),
  pushNotificationToTheQueue: (notification: INotificationProps) =>
    createAction(
      NotificationActionsTypes.PUSH_NOTIFICATION_TO_THE_QUEUE,
      notification,
    ),
  hideNotification: (key: string) =>
    createAction(NotificationActionsTypes.HIDE_NOTIFICATION, key),
};

export { NotificationActionsTypes, NotificationActions };
