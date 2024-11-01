import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';
import { useUnseenNotificationsAmount } from 'modules/layout/hooks/useUnseenNotificationsAmount';

export const useNotificationsMenuButton = () => {
  const { loading: isConnecting } = useAuth();

  const { anchorEl, handleClose, handleOpen, open: isMenuOpened } = useMenu();

  const { notifications: notificationsResponse } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });

  const { unseenNotificationsAmount } = useUnseenNotificationsAmount({
    notificationsResponse,
  });

  return {
    amount: unseenNotificationsAmount,
    isLoading: isConnecting,
    anchorEl,
    handleClose,
    handleOpen,
    isMenuOpened,
  };
};
