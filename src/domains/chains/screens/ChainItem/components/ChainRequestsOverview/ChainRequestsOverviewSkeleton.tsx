import React, { ReactNode } from 'react';
import { useStyles } from './useStyles';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';

interface IChainRequestsOverviewSkeletonProps {
  className?: string;
  children: ReactNode;
}

export const ChainRequestsOverviewSkeleton = ({
  className,
  children,
}: IChainRequestsOverviewSkeletonProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.rootSkeleton, className)}>
      <div>
        {children}
        <div className={classes.infoSkeleton}>
          <Skeleton variant="rect" width="100%" height="270px" />
        </div>
      </div>
    </div>
  );
};
