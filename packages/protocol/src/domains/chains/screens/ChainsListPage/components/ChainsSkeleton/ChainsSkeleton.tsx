import { Skeleton } from '@mui/material';

import { useChainsSkeletonStyles } from './useChainsSkeletonStyles';

const SKELETON_AMOUNT = 9;

export const ChainsSkeleton = () => {
  const { classes } = useChainsSkeletonStyles();

  return (
    <div>
      <div className={classes.header}>
        <Skeleton variant="circular" className={classes.sort} />
        <Skeleton variant="circular" className={classes.search} />
      </div>
      <div className={classes.root}>
        {new Array(SKELETON_AMOUNT).fill('').map((item, index) => (
          <div key={`${item}-${index}`} className={classes.skeleton}>
            <div className={classes.row}>
              <Skeleton className={classes.name} variant="rectangular" />
              <Skeleton className={classes.icon} variant="circular" />
            </div>
            <Skeleton className={classes.content} variant="rectangular" />
          </div>
        ))}
      </div>
    </div>
  );
};
