import { Paper, Typography } from '@mui/material';
import { INotificationsSettings } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { NotificationsForm } from './NotificationsForm';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useLazyUserSettingsFetchNotificationSettingsQuery } from 'domains/userSettings/actions/notifications/fetchNotificationSettings';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useStyles } from './NotificationsBlockStyles';
import { checkChangedSignupUserSettingsAndUpdate } from 'domains/userSettings/actions/checkChangedSignupUserSettingsAndUpdate';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const NotificationsBlock = () => {
  const { classes } = useStyles();
  const [fetchNotificationSettings, notificationSettingsState] =
    useLazyUserSettingsFetchNotificationSettingsQuery();
  const [, checkSignupUserSettingsAndUpdateState] = useQueryEndpoint(
    checkChangedSignupUserSettingsAndUpdate,
  );

  useOnMount(() => {
    fetchNotificationSettings();
  });

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {t('user-settings.notifications.title')}
      </Typography>

      <Queries<INotificationsSettings, INotificationsSettings>
        queryStates={[
          notificationSettingsState,
          checkSignupUserSettingsAndUpdateState,
        ]}
        showLoaderDuringRefetch={false}
      >
        {(
          { data = {}, isFetching },
          { data: editSettingsLastData = {}, isLoading },
        ) => {
          if (isFetching || isLoading) {
            return <OverlaySpinner />;
          }

          return (
            <NotificationsForm
              settings={{ ...data, ...editSettingsLastData }}
            />
          );
        }}
      </Queries>
    </Paper>
  );
};
