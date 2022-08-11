import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { ChainItemHeaderSkeleton } from './components/ChainItemHeader/components/ChainItemHeaderSkeleton';
import { ChainRequestsOverviewSkeleton } from './components/ChainRequestsOverview/ChainRequestsOverviewSkeleton';
import { useStyles } from './ChainItemStyles';

export const ChainItemSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.chainDetailsWrapper}>
      <ChainItemHeaderSkeleton />
      <ChainRequestsOverviewSkeleton className={classes.chainRequestsOverview}>
        <div className={classes.details}>
          <Skeleton width="33%" height={42} variant="rect" />
        </div>
      </ChainRequestsOverviewSkeleton>
    </div>
  );
};
