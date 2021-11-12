import React from 'react';
import classNames from 'classnames';
import { useIsWXGAPlusDown } from 'modules/themes/useTheme';
import { ChainItemHeaderSkeleton } from './components/ChainItemHeader/ChainItemHeaderSkeleton';
import { ChainRequestsOverviewSkeleton } from './components/ChainRequestsOverview/ChainRequestsOverviewSkeleton';
import { DetailsBlockSkeleton } from './components/ChainItemDetails/DetailsBlock/DetailsBlockSkeleton';
import { useStyles } from './ChainItemStyles';

export const ChainItemSkeleton = () => {
  const isWXGAPlusDown = useIsWXGAPlusDown();
  const classes = useStyles();

  const detailsBlock = (
    <div
      className={classNames(
        classes.chainItemDetails,
        classes.chainItemDetailsSkeleton,
      )}
    >
      <DetailsBlockSkeleton className={classes.chainItemDetailsInnerSkeleton} />
      <DetailsBlockSkeleton className={classes.chainItemDetailsInnerSkeleton} />
      <DetailsBlockSkeleton className={classes.chainItemDetailsInnerSkeleton} />
    </div>
  );

  return (
    <>
      <div className={classes.chainDetailsWrapper}>
        <ChainItemHeaderSkeleton className={classes.chainItemHeader} />
        {isWXGAPlusDown && detailsBlock}
        <ChainRequestsOverviewSkeleton
          className={classes.chainRequestsOverview}
        />
        <ChainRequestsOverviewSkeleton
          className={classes.chainRequestsOverview}
        />
      </div>
      {!isWXGAPlusDown && detailsBlock}
    </>
  );
};
