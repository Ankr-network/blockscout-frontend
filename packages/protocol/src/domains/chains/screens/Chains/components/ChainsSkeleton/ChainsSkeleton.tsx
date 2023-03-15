import { Skeleton } from '@mui/material';
import { useChainsSkeletonStyles } from './useChainsSkeletonStyles';

const SKELETON_AMOUNT = 9;

export const ChainsSkeleton = () => {
  const { classes } = useChainsSkeletonStyles();

  return (
    <div className={classes.root}>
      {new Array(SKELETON_AMOUNT).fill('').map((item, index) => (
        <div key={`${item}-${index}`} className={classes.skeleton}>
          <div className={classes.row}>
            <Skeleton className={classes.name} variant="text" />
            <Skeleton className={classes.icon} variant="circular" />
          </div>
          <Skeleton className={classes.content} variant="text" />
        </div>
      ))}
    </div>
  );
};
