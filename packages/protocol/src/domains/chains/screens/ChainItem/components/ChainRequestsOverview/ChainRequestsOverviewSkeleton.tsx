import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { Spinner } from 'ui';
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
      <Spinner className={classes.spinner} />
      {children}
    </div>
  );
};
