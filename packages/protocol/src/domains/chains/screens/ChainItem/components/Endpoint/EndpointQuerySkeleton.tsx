import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './EndpointStyles';
import { Box } from '@material-ui/core';

export const EndpointQuerySkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Box display="flex" justifyContent="space-between">
          <Skeleton width="30%" height={22} variant="rect" />
          <Skeleton width="20%" height={22} variant="rect" />
        </Box>
        <Skeleton
          style={{ marginTop: 22 }}
          width="100%"
          height={44}
          variant="rect"
        />
      </div>
    </div>
  );
};
