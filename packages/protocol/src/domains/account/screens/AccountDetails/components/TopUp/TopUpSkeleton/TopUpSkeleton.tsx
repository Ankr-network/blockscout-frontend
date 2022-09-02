import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './TopUpSkeletonStyles';

export const TopUpSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton className={classes.tabs} variant="rect" />
      <Skeleton className={classes.input} variant="rect" />
      <Skeleton className={classes.button} variant="rect" />
    </div>
  );
};
