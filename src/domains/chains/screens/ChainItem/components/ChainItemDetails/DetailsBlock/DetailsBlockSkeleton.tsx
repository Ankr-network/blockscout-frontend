import React from 'react';
import { useStyles } from './useStyles';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';

interface IProps {
  className?: string;
}

export const DetailsBlockSkeleton = ({ className }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <Skeleton width="50%" />
      </div>
      <div className={classes.bottom}>
        <Skeleton width="30%" className={classes.value} />
      </div>
    </div>
  );
};
