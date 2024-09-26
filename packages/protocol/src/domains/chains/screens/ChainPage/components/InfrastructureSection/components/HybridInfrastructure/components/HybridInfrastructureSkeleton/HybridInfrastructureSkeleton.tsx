import React from 'react';
import { Box, Skeleton } from '@mui/material';

import { useStyles } from '../EndpointInfo/EndpointStyles';

export const HybridInfrastructureSkeleton = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Box display="flex" justifyContent="space-between">
          <Skeleton width="30%" height={22} variant="rectangular" />
          <Skeleton width="20%" height={22} variant="rectangular" />
        </Box>
        <Skeleton
          style={{ marginTop: 22 }}
          width="100%"
          height={44}
          variant="rectangular"
        />
      </div>
    </div>
  );
};
