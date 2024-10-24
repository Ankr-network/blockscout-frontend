import { useCallback } from 'react';
import { Check, Gear, More, OverlaySpinner } from '@ankr.com/ui';
import { Button, Menu, MenuItem, Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useNotificationsMenuStyles } from './useNotificationsMenuStyles';
import { notificationsMenuTranslation } from './translation';
import { useNotificationsMenu } from './useNotificationsMenu';

export interface INotificationsMenuProps {
  isEmptyNotifications: boolean;
  buttonClassname?: string;
}

export const NotificationsMenu = ({
  buttonClassname,
  isEmptyNotifications,
}: INotificationsMenuProps) => {
  const { keys, t } = useTranslation(notificationsMenuTranslation);

  const {
    anchorEl,
    handleClose,
    handleMarkAllAsRead,
    handleOpen,
    hasUnseenNotifications,
    isLoading,
    isOpened,
    redirectToSettings,
  } = useNotificationsMenu();

  const { classes, cx } = useNotificationsMenuStyles(isOpened);

  const onClose = useCallback(() => handleClose(), [handleClose]);

  const handleClickMarkAsRead = useCallback(() => {
    handleMarkAllAsRead();
    onClose();
  }, [handleMarkAllAsRead, onClose]);

  return (
    <>
      <Button
        className={cx(classes.button, buttonClassname)}
        onClick={handleOpen}
        variant="outlined"
        size="small"
      >
        <More className={classes.icon} />
      </Button>
      <Menu
        PaperProps={{
          className: classes.paper,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 32,
          horizontal: 'right',
        }}
        onClose={onClose}
        open={isOpened}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {isLoading ? (
          <OverlaySpinner size={40} />
        ) : (
          <>
            <MenuItem
              disabled={!hasUnseenNotifications || isEmptyNotifications}
              onClick={handleClickMarkAsRead}
            >
              <div className={classes.menuItem}>
                <Check className={classes.menuIcon} />
                <Typography variant="body2">{t(keys.markRead)}</Typography>
              </div>
            </MenuItem>
            <MenuItem onClick={redirectToSettings}>
              <div className={classes.menuItem}>
                <Gear className={classes.menuIcon} />
                <Typography variant="body2">{t(keys.settings)}</Typography>
              </div>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};
