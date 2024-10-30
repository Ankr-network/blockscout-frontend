import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { ICommonNotificationData } from '../types';
import { INotificationDialogProps } from '../NotificationDialog';

export interface IUseNotificationDialogProps extends ICommonNotificationData {}

export const useNotificationDialog = ({
  category,
  message,
  timestamp,
  title,
}: IUseNotificationDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleNotificationDialogOpen,
  } = useDialog();

  const notificationDialogProps = useMemo(
    (): INotificationDialogProps => ({
      category,
      message,
      onClose: handleClose,
      open: isOpened,
      timestamp,
      title,
    }),
    [category, handleClose, isOpened, message, timestamp, title],
  );

  return { handleNotificationDialogOpen, notificationDialogProps };
};
