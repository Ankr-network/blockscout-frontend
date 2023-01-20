import React from 'react';
import { Skeleton } from '@mui/material';

import { useStyles } from './DetailsSkeletonStyles';

export const DetailsSkeleton = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton className={classes.marker} variant="circular" />
      <Skeleton className={classes.usdBalance} variant="rectangular" />
      <Skeleton className={classes.description} variant="rectangular" />
    </div>
  );
};
