import { NotificationBellIcon } from '@ankr.com/ui';
import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { translation } from 'modules/notifications/translation';

import { useEmptyNotificationsStyles } from './useEmptyNotificationsStyles';

export const EmptyNotifications = () => {
  const { classes } = useEmptyNotificationsStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <div className={classes.root}>
      <div className={classes.iconWrapper}>
        <NotificationBellIcon className={classes.icon} />
      </div>
      <Typography variant="body3">{t(keys.empty)}</Typography>
    </div>
  );
};
