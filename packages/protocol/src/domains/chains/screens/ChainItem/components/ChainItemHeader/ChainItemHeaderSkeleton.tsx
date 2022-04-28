import React from 'react';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

import { ExclusiveRPCEndpointsSkeleton } from './ExclusiveRPCEndpoints';
import { useStyles } from './ChainItemHeaderSkeletonStyles';

interface IChainItemHeaderProps {
  className?: string;
}

export const ChainItemHeaderSkeleton = ({
  className,
}: IChainItemHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Skeleton variant="circle" height={50} width={50} />
          <Skeleton
            variant="rect"
            width={70}
            height={24}
            className={classes.rect}
          />
        </div>
        <ExclusiveRPCEndpointsSkeleton />
      </div>
    </div>
  );
};
