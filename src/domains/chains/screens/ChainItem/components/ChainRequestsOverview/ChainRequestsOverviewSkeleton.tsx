import React from 'react';
import { useStyles } from './useStyles';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';

interface IChainRequestsOverviewSkeletonProps {
  className?: string;
}

export const ChainRequestsOverviewSkeleton = ({
  className,
}: IChainRequestsOverviewSkeletonProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.rootSkeleton, className)}>
      <div className={classes.container}>
        <div className={classes.mobileRequests}>
          <Skeleton width={80} className={classes.mobileRequestsTitle} />
          <Skeleton width={90} className={classes.mobileRequestsSubtitle} />
        </div>
        <div className={classes.infoSkeleton}>
          <Skeleton variant="rect" width="100%" height="270px" />
        </div>
      </div>
    </div>
  );
};
