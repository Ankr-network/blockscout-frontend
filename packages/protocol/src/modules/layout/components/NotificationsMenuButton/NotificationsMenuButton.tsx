import { NotificationsButton } from '../NotificationsButton';
import { NotificationsMenu } from '../NotificationsMenu/NotificationsMenu';
import { useNotificationsMenuButton } from './useNotificationsMenuButton';

export const NotificationsMenuButton = () => {
  const { amount, anchorEl, handleClose, handleOpen, isLoading, isMenuOpened } =
    useNotificationsMenuButton();

  return (
    <>
      <NotificationsButton
        amount={amount}
        isMenuOpen={isMenuOpened}
        isLoading={isLoading}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <NotificationsMenu
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClose}
      />
    </>
  );
};
