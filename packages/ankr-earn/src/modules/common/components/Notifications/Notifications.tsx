import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { uid } from 'react-uid';

import { NotificationActions } from 'store/actions/NotificationActions';
import {
  INotificationProps,
  INotificationState,
} from 'store/reducers/notificationReducer';

interface IItemProps {
  data: INotificationProps;
  onClose: (key?: string) => void;
}

function Item({ data, onClose }: IItemProps) {
  const handleClose = useCallback(() => {
    onClose(data.key);
  }, [data.key, onClose]);

  return (
    <Snackbar open {...data}>
      <Alert severity={data.severity} onClose={handleClose}>
        {data.message}
      </Alert>
    </Snackbar>
  );
}

interface INotifications {
  notifications: INotificationProps[];
  hideNotification: typeof NotificationActions.hideNotification;
}

const NotificationsComponent = ({
  notifications,
  hideNotification,
}: INotifications) => {
  const handleClose = (id?: string) => {
    hideNotification(id as string);
  };

  return (
    <>
      {notifications.map(item => (
        <Item key={uid(item)} data={item} onClose={handleClose} />
      ))}
    </>
  );
};

export const Notifications = connect(
  (state: { notification: INotificationState }) => ({
    notifications: state.notification.queue,
  }),
  {
    hideNotification: NotificationActions.hideNotification,
  },
)(NotificationsComponent);
