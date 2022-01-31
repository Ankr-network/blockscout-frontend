import React from 'react';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

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

        <div className={classes.right}>
          <Skeleton variant="rect" width={150} height={20} />
          <Skeleton variant="rect" height={42} className={classes.btnUnlock} />
        </div>
      </div>
    </div>
  );
};
