import { Paper, Skeleton } from '@mui/material';
import { useChainItemWithCodeSampleSkeletonStyles } from './useChainItemWithCodeSampleSkeletonStyles';

export const ChainItemWithCodeSampleSkeleton = () => {
  const { classes, cx } = useChainItemWithCodeSampleSkeletonStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.left}>
        <Skeleton
          className={cx(classes.skeleton, classes.title)}
          variant="rectangular"
        />
        <Skeleton
          className={cx(classes.skeleton, classes.description)}
          variant="rectangular"
        />
      </div>
      <div className={classes.right}>
        <Skeleton className={cx(classes.code)} variant="rectangular" />
      </div>
    </Paper>
  );
};
