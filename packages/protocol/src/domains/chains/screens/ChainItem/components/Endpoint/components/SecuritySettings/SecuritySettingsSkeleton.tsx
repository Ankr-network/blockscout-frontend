import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './SecuritySettingsStyles';

export const SecuritySettingsSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.left}>
          <Skeleton width="30%" height={22} variant="rect" />
          <Skeleton
            style={{ marginTop: 12 }}
            width="100%"
            height={44}
            variant="rect"
          />
        </div>

        <div className={classes.right}>
          <Skeleton width="30%" height={22} variant="rect" />
          <Skeleton
            style={{ marginTop: 12 }}
            width="100%"
            height={44}
            variant="rect"
          />
        </div>
      </div>
    </div>
  );
};
