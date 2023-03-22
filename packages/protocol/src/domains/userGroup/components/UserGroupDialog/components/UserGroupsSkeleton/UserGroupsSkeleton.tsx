import { Skeleton } from '@mui/material';

import { useAccountsListStyles } from '../AccountList/useAccountListStyles';
import { useUserGroupsSkeletonStyles } from './useUserGroupsSkeletonStyles';

export const UserGroupsSkeleton = () => {
  const { classes: containerClasses } = useAccountsListStyles();
  const { classes } = useUserGroupsSkeletonStyles();

  return (
    <div className={containerClasses.root}>
      <Skeleton className={classes.item} variant="rectangular" />
      <Skeleton className={classes.item} variant="rectangular" />
      <Skeleton className={classes.item} variant="rectangular" />
    </div>
  );
};
