import { Skeleton } from '@mui/material';

import { useChainItemHeaderSkeletonStyles } from './ChainItemHeaderSkeletonStyles';

export const ChainItemHeaderSkeleton = () => {
  const { classes } = useChainItemHeaderSkeletonStyles();

  return (
    <div className={classes.chainItemHeaderSkeleton}>
      <div className={classes.chainOverview}>
        <div className={classes.left}>
          <Skeleton className={classes.logo} variant="circular" />
          <div className={classes.description}>
            <Skeleton className={classes.title} variant="rectangular" />
            <Skeleton className={classes.subtitle} variant="rectangular" />
          </div>
        </div>
        <Skeleton className={classes.docs} variant="rectangular" />
      </div>
      <div className={classes.controls}>
        <Skeleton className={classes.chainTypeSelector} variant="rectangular" />
        <Skeleton className={classes.groupSelector} variant="rectangular" />
      </div>
    </div>
  );
};
