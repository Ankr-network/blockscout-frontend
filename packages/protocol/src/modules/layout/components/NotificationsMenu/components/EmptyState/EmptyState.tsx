import { EmptyNotifications } from 'modules/notifications/components/EmptyNotifications';

import { useEmptyStateStyles } from './useEmptyStateStyles';

export const EmptyState = () => {
  const { classes } = useEmptyStateStyles();

  return (
    <div className={classes.root}>
      <EmptyNotifications />
    </div>
  );
};
