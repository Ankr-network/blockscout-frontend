import React from 'react';
import { Skeleton } from '@mui/material';

import { useStyles } from './SecuritySettingsStyles';

export const SecuritySettingsSkeleton = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton
        style={{ marginBottom: 16 }}
        width="20%"
        height={22}
        variant="rectangular"
      />
      <div className={classes.container}>
        <div>
          <Skeleton width="30%" height={22} variant="rectangular" />
          <Skeleton
            style={{ marginTop: 12 }}
            width="100%"
            height={44}
            variant="rectangular"
          />
        </div>

        <div>
          <Skeleton width="30%" height={22} variant="rectangular" />
          <Skeleton
            style={{ marginTop: 12 }}
            width="100%"
            height={44}
            variant="rectangular"
          />
        </div>
      </div>
    </div>
  );
};
