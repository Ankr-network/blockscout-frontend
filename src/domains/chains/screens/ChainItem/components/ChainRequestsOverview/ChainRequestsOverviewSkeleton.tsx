import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { Spinner } from 'uiKit/Spinner';
import { useStyles } from './useStyles';

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
          <Spinner />
        </div>
      </div>
    </div>
  );
};
