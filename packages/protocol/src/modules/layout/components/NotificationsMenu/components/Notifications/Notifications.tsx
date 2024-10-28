import { INotificationProps } from 'modules/notifications/types';

import { Notification } from './Notification';
import { useNotificationsStyles } from './useNotificationsStyles';

interface INotificationsProps {
  notifications: INotificationProps[];
}

export const Notifications = ({ notifications }: INotificationsProps) => {
  const { classes } = useNotificationsStyles();

  return (
    <div className={classes.root}>
      {notifications.map(notification => (
        <Notification key={notification.date} {...notification} />
      ))}
    </div>
  );
};
