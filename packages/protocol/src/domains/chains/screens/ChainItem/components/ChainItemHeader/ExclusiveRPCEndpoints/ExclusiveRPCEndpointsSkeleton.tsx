import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './ExclusiveRPCEndpointsStyles';

export const ExclusiveRPCEndpointsSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.skeleton}>
      <Skeleton variant="rect" width={150} height={20} />
      <div className={classes.details}>
        <Skeleton variant="rect" height={42} className={classes.btnUnlock} />
        <Skeleton variant="rect" height={42} className={classes.btnUnlock} />
      </div>
    </div>
  );
};
