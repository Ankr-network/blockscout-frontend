import { ArrowDown, NotificationBellIcon } from '@ankr.com/ui';

import { LoadableButton } from 'uiKit/LoadableButton';
import { AmountBadge } from 'modules/notifications/components/AmountBadge';

import { useNotificationsButtonStyles } from './useNotificationsButtonStyles';

export interface INotificationsButtonProps {
  amount: number;
  isMenuOpen: boolean;
  isLoading: boolean;
  handleClose: () => void;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NotificationsButton = ({
  amount,
  handleClose,
  handleOpen,
  isLoading,
  isMenuOpen,
}: INotificationsButtonProps) => {
  const { classes } = useNotificationsButtonStyles({
    isMenuOpen,
  });

  return (
    <LoadableButton
      className={classes.root}
      id="test"
      loading={isLoading}
      variant="text"
      onClick={isMenuOpen ? handleClose : handleOpen}
    >
      <div className={classes.content}>
        <NotificationBellIcon className={classes.bell} />

        {amount > 0 && (
          <AmountBadge amount={amount} className={classes.amountBadge} />
        )}

        <ArrowDown className={classes.selectIcon} />
      </div>
    </LoadableButton>
  );
};
