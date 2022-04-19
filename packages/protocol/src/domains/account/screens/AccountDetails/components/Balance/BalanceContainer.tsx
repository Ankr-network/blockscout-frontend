import React from 'react';
import { Box } from '@material-ui/core';

import { Balance } from './Balance';
import { BalanceSkeleton } from './Skeleton';
import { useBalanceData } from './hooks/useBalanceData';
import { useStyles } from './BalanceStyles';

export const BalanceContainer = () => {
  const { isLoading, ...props } = useBalanceData();

  const classes = useStyles();

  return (
    <Box className={classes.balanceRoot}>
      {isLoading ? <BalanceSkeleton /> : <Balance {...props} />}
    </Box>
  );
};
