import { Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { t } from '@ankr.com/common';
import { useStyles } from './NotificationsBlockStyles';
import { NotificationsForm } from './NotificationsForm';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { fetchNotificationSettings } from 'domains/userSettings/actions/notifications/fetchNotificationSettings';
import { ResponseData } from 'modules/api/utils/ResponseData';

export const NotificationsBlock = () => {
  const classes = useStyles();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchNotificationSettings());
  });

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {t('user-settings.notifications.title')}
      </Typography>

      <Queries<ResponseData<typeof fetchNotificationSettings>>
        requestActions={[fetchNotificationSettings]}
      >
        {({ data }) => <NotificationsForm settings={data} />}
      </Queries>
    </Paper>
  );
};
