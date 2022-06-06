import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { DetailsSkeleton } from '../Details';
import { useStyles } from './BalanceSkeletonStyles';

export const BalanceSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <Skeleton className={classes.title} variant="rect" />
          <Skeleton className={classes.currency} variant="rect" />
        </div>
        <Skeleton className={classes.withdrawButton} variant="rect" />
      </div>
      <Skeleton className={classes.balance} variant="rect" />
      <DetailsSkeleton />
    </>
  );
};
