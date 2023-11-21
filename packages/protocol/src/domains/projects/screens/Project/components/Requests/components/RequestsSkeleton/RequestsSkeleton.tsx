import { Skeleton } from '@mui/material';

import { useRequestsSkeletonStyles } from './useRequestsSkeletonStyles';

export const RequestsSkeleton = () => {
  const { classes } = useRequestsSkeletonStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Skeleton className={classes.counts} variant="rectangular" />
        <Skeleton className={classes.percent} variant="rectangular" />
      </div>

      <Skeleton className={classes.chart} variant="rectangular" />
    </div>
  );
};
