import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './ExclusiveRPCEndpointsStyles';

export const ExclusiveRPCEndpointsSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton className={classes.mainTitle} variant="rect" />
      <Skeleton className={classes.groupTitle} variant="rect" />
      <div className={classes.endpoints}>
        <Skeleton className={classes.endpoint} variant="rect" />
        <Skeleton className={classes.endpoint} variant="rect" />
      </div>
    </>
  );
};
