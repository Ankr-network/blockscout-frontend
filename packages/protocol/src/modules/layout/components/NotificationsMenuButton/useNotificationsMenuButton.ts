import { useMemo } from 'react';

import { EMilliSeconds } from 'modules/common/constants/const';
import { getNotificationAge } from 'modules/notifications/utils/getNotificationAge';
import { isBroadcastNotification } from 'modules/notifications/utils/isBroadcastNotification';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';

export const useNotificationsMenuButton = () => {
  const { loading: isConnecting } = useAuth();

  const { anchorEl, handleClose, handleOpen, open: isMenuOpened } = useMenu();

  const { notifications: notificationsResponse } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });

  const notifications = notificationsResponse.notifications;

  const unseenNotificationsAmount = useMemo(
    () =>
      notifications.filter(
        notification =>
          isBroadcastNotification(notification) &&
          getNotificationAge(notification) < EMilliSeconds.Day,
      ).length,
    [notifications],
  );

  return {
    amount: unseenNotificationsAmount,
    isLoading: isConnecting,
    anchorEl,
    handleClose,
    handleOpen,
    isMenuOpened,
  };
};
