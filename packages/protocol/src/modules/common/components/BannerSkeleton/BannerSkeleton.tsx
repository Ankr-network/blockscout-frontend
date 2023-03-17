import { useBannerSkeletonStyles } from './useBannerSkeletonStyles';
import { Paper, Skeleton } from '@mui/material';

export const BannerSkeleton = () => {
  const { classes } = useBannerSkeletonStyles();

  return (
    <Paper className={classes.root}>
      <Skeleton className={classes.image} variant="circular" />
      <Skeleton className={classes.titleMobile} variant="text" />
      <Skeleton className={classes.text} variant="text" />
    </Paper>
  );
};
