import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './EndpointSkeletonStyles';

export const EndpointSkeleton = () => {
  const classes = useStyles();

  return (
    <Skeleton
      variant="rect"
      width="100%"
      height={160}
      className={classes.title}
    />
  );
};
