import { Skeleton } from '@mui/material';

import { useWhitelistItemsCountersSkeletonStyles } from './useWhitelistItemsCountersSkeletonStyles';

export const WhitelistItemsCountersSkeleton = () => {
  const { classes } = useWhitelistItemsCountersSkeletonStyles();

  return (
    <div className={classes.root}>
      <Skeleton className={classes.item} variant="rectangular" />
      <Skeleton className={classes.item} variant="rectangular" />
      <Skeleton className={classes.item} variant="rectangular" />
    </div>
  );
};
