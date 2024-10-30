import { push } from 'connected-react-router';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useMarkNotificationsStatusMutation } from 'modules/notifications/actions/markNotificationsStatus';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';

export const useNotificationsMenu = () => {
  const { anchorEl, handleClose, handleOpen, open: isOpened } = useMenu();

  const dispatch = useDispatch();

  const {
    handleRefetchNotifications,
    isLoading,
    notificationsAmount: unseenNotificationsAmount,
  } = useNotifications({
    skipFetching: false,
    only_unseen: true,
  });

  useEffect(() => {
    if (isOpened) {
      handleRefetchNotifications();
    }
  }, [handleRefetchNotifications, isOpened]);

  const redirectToSettings = useCallback(() => {
    dispatch(push(UserSettingsRoutesConfig.settings.generatePath()));
  }, [dispatch]);

  const [markNotificationsStatus] = useMarkNotificationsStatusMutation();

  const handleMarkAllAsRead = useCallback(() => {
    markNotificationsStatus({ seen: true });
  }, [markNotificationsStatus]);

  return {
    anchorEl,
    handleClose,
    handleOpen,
    hasUnseenNotifications: unseenNotificationsAmount > 0,
    isLoading,
    isOpened,
    redirectToSettings,
    handleMarkAllAsRead,
  };
};
