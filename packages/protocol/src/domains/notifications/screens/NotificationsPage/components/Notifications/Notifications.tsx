import { INotificationProps } from 'modules/notifications/types';

import { Notification } from './Notification';
import { useNotificationsStyles } from './useNotificationsStyles';

interface INotificationsProps {
  notifications: INotificationProps[];
  handleRefetchUnseenNotifications: () => void;
}

export const Notifications = ({
  handleRefetchUnseenNotifications,
  notifications,
}: INotificationsProps) => {
  const { classes } = useNotificationsStyles();

  return (
    <div className={classes.root}>
      {notifications.map(notification => (
        <Notification
          handleRefetchUnseenNotifications={handleRefetchUnseenNotifications}
          key={notification.date}
          {...notification}
        />
      ))}
    </div>
  );
};
