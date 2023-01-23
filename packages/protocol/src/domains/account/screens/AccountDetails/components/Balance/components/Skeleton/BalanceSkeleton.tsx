import React from 'react';
import { Skeleton } from '@mui/material';

import { DetailsSkeleton } from '../Details';
import { useStyles } from './BalanceSkeletonStyles';

export const BalanceSkeleton = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <Skeleton className={classes.title} variant="rectangular" />
          <Skeleton className={classes.currency} variant="rectangular" />
        </div>
        <Skeleton className={classes.withdrawButton} variant="rectangular" />
      </div>
      <Skeleton className={classes.balance} variant="rectangular" />
      <DetailsSkeleton />
    </>
  );
};
