import { Skeleton } from '@mui/material';

import { useFailedRequestsBannerStyles } from './useFailedRequestsBannerStyles';

export const FailedRequestsBannerSkeleton = () => {
  const { classes } = useFailedRequestsBannerStyles();
  return (
    <div className={classes.skeleton}>
      <div className={classes.holder}>
        <Skeleton variant="rectangular" className={classes.rect1} />
        <Skeleton variant="rectangular" className={classes.rect2} />
      </div>
      <Skeleton variant="rectangular" className={classes.rect} />
    </div>
  );
};
