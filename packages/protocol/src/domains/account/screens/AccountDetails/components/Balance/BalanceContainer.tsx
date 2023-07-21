import { Box } from '@mui/material';

import { useBalanceData } from 'domains/account/hooks/useBalanceData';

import { Balance } from './Balance';
import { BalanceSkeleton } from './components/Skeleton';
import { useStyles } from './BalanceStyles';

export interface BalanceContainerProps {
  className?: string;
}

export const BalanceContainer = ({ className }: BalanceContainerProps) => {
  const { isLoading, ...props } = useBalanceData();

  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.balanceRoot, className)}>
      {isLoading ? <BalanceSkeleton /> : <Balance {...props} />}
    </Box>
  );
};
