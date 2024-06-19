import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material';
import { uid } from 'react-uid';
import { tHTML } from '@ankr.com/common';
import { Alert } from '@ankr.com/ui';

import { useAppSelector } from 'store/useAppSelector';

import {
  INotificationProps,
  notificationSlice,
} from '../../store/notificationSlice';

interface IItemProps {
  data: INotificationProps;
  onClose: (key?: any) => void;
}

function Item({ data, onClose }: IItemProps) {
  const {
    isHTML,
    key,
    message,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    primaryButtonText,
    secondaryButtonText,
    severity,
    title,
    type,
  } = data;

  const handleClose = useCallback(() => {
    onClose(key);
  }, [key, onClose]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open
      {...data}
    >
      <Alert
        title={title}
        severity={severity}
        type={type}
        onClose={handleClose}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        onPrimaryButtonClick={onPrimaryButtonClick}
        onSecondaryButtonClick={onSecondaryButtonClick}
      >
        {isHTML ? tHTML(message as string) : message}
      </Alert>
    </Snackbar>
  );
}

export const Notifications = () => {
  const notifications = useAppSelector(state => state.notifications.queue);
  const dispatch = useDispatch();

  const handleClose = (id: string) => {
    dispatch(notificationSlice.actions.hideNotification(id));
  };

  return (
    <>
      {notifications.map(item => (
        <Item key={uid(item)} data={item} onClose={handleClose} />
      ))}
    </>
  );
};
