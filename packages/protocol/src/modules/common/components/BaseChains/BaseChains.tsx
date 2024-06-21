import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { ChainsSkeleton } from 'domains/chains/screens/Chains/components/ChainsSkeleton';

import { useBaseChainsStyles } from './BaseChainsStyles';

interface BaseChainsProps {
  top?: ReactNode;
  loading: boolean;
  children: ReactNode;
}

export const BaseChains = ({ children, loading, top }: BaseChainsProps) => {
  const { classes } = useBaseChainsStyles();

  return (
    <Box className={classes.root}>
      {top}
      {loading ? <ChainsSkeleton /> : <>{children}</>}
    </Box>
  );
};
