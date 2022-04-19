import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './DetailsSkeletonStyles';

export const DetailsSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton className={classes.marker} variant="circle" />
      <Skeleton className={classes.usdBalance} variant="rect" />
      <Skeleton className={classes.description} variant="rect" />
    </div>
  );
};
