import { Paper, Typography } from '@material-ui/core';
import { INotificationsSettings } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { NotificationsForm } from './NotificationsForm';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyUserSettingsFetchNotificationSettingsQuery } from 'domains/userSettings/actions/notifications/fetchNotificationSettings';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useStyles } from './NotificationsBlockStyles';

export const NotificationsBlock = () => {
  const classes = useStyles();
  const [fetchNotificationSettings, notificationSettingsState] =
    useLazyUserSettingsFetchNotificationSettingsQuery();

  useOnMount(() => {
    fetchNotificationSettings();
  });

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {t('user-settings.notifications.title')}
      </Typography>

      <Queries<INotificationsSettings>
        queryStates={[notificationSettingsState]}
      >
        {({ data = {} }) => <NotificationsForm settings={data} />}
      </Queries>
    </Paper>
  );
};
