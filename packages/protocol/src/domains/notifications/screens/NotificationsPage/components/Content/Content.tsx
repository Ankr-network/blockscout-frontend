import { Paper } from '@mui/material';

import { EmptyNotifications } from 'modules/notifications/components/EmptyNotifications';
import { Error } from 'modules/notifications/components/Error';
import { INotificationProps } from 'modules/notifications/types';

import { useContentStyles } from './useContentStyles';
import { LoadingState } from '../LoadingState';
import { Notifications } from '../Notifications';

interface IContentProps {
  isError: boolean;
  isLoading: boolean;
  notifications: INotificationProps[];
  handleRefetchUnseenNotifications: () => void;
}

export const Content = ({
  handleRefetchUnseenNotifications,
  isError,
  isLoading,
  notifications,
}: IContentProps) => {
  const { classes } = useContentStyles();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <Paper className={classes.root}>
        <Error />
      </Paper>
    );
  }

  if (notifications.length === 0) {
    return (
      <Paper className={classes.root}>
        <EmptyNotifications />
      </Paper>
    );
  }

  return (
    <Notifications
      handleRefetchUnseenNotifications={handleRefetchUnseenNotifications}
      notifications={notifications}
    />
  );
};
