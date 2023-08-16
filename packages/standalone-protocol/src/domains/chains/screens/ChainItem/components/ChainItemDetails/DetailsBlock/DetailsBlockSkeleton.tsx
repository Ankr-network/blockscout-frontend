import React from 'react';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './useStyles';

interface IProps {
  className?: string;
}

export const DetailsBlockSkeleton = ({ className }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <Skeleton width="70%" />
      </div>
      <div className={classes.bottom}>
        <Skeleton width="80%" className={classes.value} />
      </div>
    </div>
  );
};
