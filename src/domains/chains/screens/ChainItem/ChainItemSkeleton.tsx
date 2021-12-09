import React from 'react';

import { ChainItemHeaderSkeleton } from './components/ChainItemHeader/ChainItemHeaderSkeleton';
import { ChainRequestsOverviewSkeleton } from './components/ChainRequestsOverview/ChainRequestsOverviewSkeleton';
import { DetailsBlockSkeleton } from './components/ChainItemDetails/DetailsBlock/DetailsBlockSkeleton';
import { useStyles } from './ChainItemStyles';

export const ChainItemSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.chainDetailsWrapper}>
        <ChainItemHeaderSkeleton className={classes.chainItemHeader} />
        <ChainRequestsOverviewSkeleton
          className={classes.chainRequestsOverview}
        >
          <div className={classes.details}>
            <DetailsBlockSkeleton />
            <DetailsBlockSkeleton />
            <DetailsBlockSkeleton />
          </div>
        </ChainRequestsOverviewSkeleton>
      </div>
    </>
  );
};
