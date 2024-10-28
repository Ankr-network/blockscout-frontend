import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';

export const useNotificationsMenuButton = () => {
  const { loading: isConnecting } = useAuth();

  const { anchorEl, handleClose, handleOpen, open: isMenuOpened } = useMenu();

  const { notificationsAmount: unseenNotificationsAmount } = useNotifications({
    skipFetching: true,
    only_unseen: true,
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
