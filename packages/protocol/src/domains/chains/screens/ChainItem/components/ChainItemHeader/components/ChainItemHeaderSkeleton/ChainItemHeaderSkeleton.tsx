import { Skeleton } from '@material-ui/lab';

import { useChainItemHeaderSkeletonStyles } from './ChainItemHeaderSkeletonStyles';

export const ChainItemHeaderSkeleton = () => {
  const classes = useChainItemHeaderSkeletonStyles();

  return (
    <div className={classes.chainItemHeaderSkeleton}>
      <div className={classes.chainOverview}>
        <div className={classes.left}>
          <Skeleton className={classes.logo} variant="circle" />
          <div className={classes.description}>
            <Skeleton className={classes.title} variant="rect" />
            <Skeleton className={classes.subtitle} variant="rect" />
          </div>
        </div>
        <Skeleton className={classes.docs} variant="rect" />
      </div>
      <div className={classes.controls}>
        <Skeleton className={classes.chainTypeSelector} variant="rect" />
        <Skeleton className={classes.groupSelector} variant="rect" />
      </div>
    </div>
  );
};
