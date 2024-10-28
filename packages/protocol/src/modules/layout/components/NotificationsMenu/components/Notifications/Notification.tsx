import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

import { INotificationProps } from 'modules/notifications/types';
import { CategoryIcon } from 'modules/notifications/components/CategoryIcon';
import { setOpenNotificationDialogId } from 'modules/notifications/utils/openNotificationDialogUtils';
import { NotificationsRoutesConfig } from 'domains/notifications/Routes';

import { useNotificationsStyles } from './useNotificationsStyles';

export const Notification = ({
  category,
  date,
  id,
  isUnread = false,
  text,
  title,
}: INotificationProps) => {
  const { classes } = useNotificationsStyles();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    setOpenNotificationDialogId(id);
    dispatch(push(NotificationsRoutesConfig.notifications.generatePath()));
  }, [dispatch, id]);

  return (
    <div
      className={classes.item}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <CategoryIcon category={category} isUnread={isUnread} />
      <div className={classes.infoWrapper}>
        <div className={classes.title}>
          <Typography className={classes.titleText} variant="subtitle3">
            {title}
          </Typography>
          <Typography
            color="textSecondary"
            className={classes.date}
            variant="body4"
          >
            {format(new Date(date), 'MMM d Y HH:mm')}
          </Typography>
        </div>
        <Typography component="div" className={classes.text} variant="body3">
          {text}
        </Typography>
      </div>
    </div>
  );
};
