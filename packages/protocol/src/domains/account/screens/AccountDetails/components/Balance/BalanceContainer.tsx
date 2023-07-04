import { Box } from '@mui/material';

import { Balance } from './Balance';
import { BalanceSkeleton } from './components/Skeleton';
import { useBalanceData } from 'domains/account/hooks/useBalanceData';
import { useStyles } from './BalanceStyles';

export const BalanceContainer = () => {
  const { isLoading, ...props } = useBalanceData();

  const { classes } = useStyles();

  return (
    <Box className={classes.balanceRoot}>
      {isLoading ? <BalanceSkeleton /> : <Balance {...props} />}
    </Box>
  );
};
