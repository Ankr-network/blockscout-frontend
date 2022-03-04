import React from 'react';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { useStyles } from './ChainItemHeaderStyles';

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
          <Skeleton variant="rect" width={50} height={50} />
        </div>

        <div className={classes.right}>
          <Skeleton variant="rect" height={50} />
        </div>
      </div>
      <div className={classes.bottom}>
        <Skeleton width={180} className={classes.tooltip} />
        <Skeleton
          variant="rect"
          width={240}
          height={42}
          className={classes.btnUnlock}
        />
      </div>
    </div>
  );
};
