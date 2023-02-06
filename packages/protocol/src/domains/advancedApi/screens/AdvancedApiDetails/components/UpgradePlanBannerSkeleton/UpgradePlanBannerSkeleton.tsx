import { useUpgradePlanBannerSkeletonStyles } from './useUpgradePlanBannerSkeletonStyles';
import { Paper, Skeleton } from '@mui/material';

export const UpgradePlanBannerSkeleton = () => {
  const { classes } = useUpgradePlanBannerSkeletonStyles();

  return (
    <Paper className={classes.root}>
      <Skeleton className={classes.image} variant="circular" />
      <Skeleton className={classes.titleMobile} variant="text" />
      <Skeleton className={classes.text} variant="text" />
    </Paper>
  );
};
