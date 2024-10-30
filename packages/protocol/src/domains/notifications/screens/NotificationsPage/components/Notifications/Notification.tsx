import { useCallback, useEffect } from 'react';
import { ChevronRightIcon } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

import { CategoryIcon } from 'modules/notifications/components/CategoryIcon';
import { NotificationDialog } from 'modules/notifications/components/NotificationDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useUpdateNotificationStatusMutation } from 'modules/notifications/actions/updateNotificationStatus';
import { INotificationProps } from 'modules/notifications/types';
import {
  getOpenNotificationDialogId,
  removeOpenNotificationDialogId,
} from 'modules/notifications/utils/openNotificationDialogUtils';

import { useNotificationsStyles } from './useNotificationsStyles';

interface INotificationRowProps extends INotificationProps {
  handleRefetchUnseenNotifications: () => void;
}

export const Notification = ({
  category,
  date,
  handleRefetchUnseenNotifications,
  id,
  isUnread = false,
  text,
  title,
}: INotificationRowProps) => {
  const { classes, cx } = useNotificationsStyles();
  const notificationId = getOpenNotificationDialogId();

  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();

  const { isOpened, onClose, onOpen } = useDialog();

  const handleOpen = useCallback(async () => {
    onOpen();
    if (isUnread) {
      await updateNotificationStatus({ seen: true, id });
      handleRefetchUnseenNotifications();
    }
  }, [
    onOpen,
    handleRefetchUnseenNotifications,
    updateNotificationStatus,
    id,
    isUnread,
  ]);

  useEffect(() => {
    if (notificationId === id) {
      handleOpen();
      removeOpenNotificationDialogId();
    }
  }, [id, handleOpen, notificationId]);

  return (
    <>
      <div
        className={classes.item}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
      >
        <CategoryIcon category={category} isUnread={isUnread} />
        <div className={classes.infoWrapper}>
          <div className={classes.title}>
            <Typography variant="subtitle2" className={classes.titleText}>
              {title}
            </Typography>
            <Typography
              className={cx(classes.date, classes.desktopElement)}
              color="textSecondary"
              variant="body3"
            >
              {format(new Date(date), 'MMM d Y HH:mm')}
            </Typography>
          </div>
          <div className={classes.message}>
            <Typography
              component="div"
              className={classes.text}
              variant="body3"
            >
              {text}
            </Typography>
            <ChevronRightIcon
              className={cx(classes.chevronIcon, classes.desktopElement)}
            />
          </div>
          <div className={cx(classes.message, classes.mobileElement)}>
            <Typography
              className={classes.date}
              color="textSecondary"
              variant="body3"
            >
              {format(new Date(date), 'MMM d Y HH:mm')}
            </Typography>
            <ChevronRightIcon className={classes.chevronIcon} />
          </div>
        </div>
      </div>

      <NotificationDialog
        onClose={onClose}
        open={isOpened}
        category={category}
        title={title}
        message={text}
        timestamp={date}
      />
    </>
  );
};
