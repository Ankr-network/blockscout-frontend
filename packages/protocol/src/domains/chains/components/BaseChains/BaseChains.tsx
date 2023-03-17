import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { useBaseChainsStyles } from './BaseChainsStyles';
import { ReminderDialog } from '../ReminderDialog';
import { ChainsSkeleton } from 'domains/chains/screens/Chains/components/ChainsSkeleton';

interface BaseChainsProps {
  top?: ReactNode;
  shouldShowReminderDialog?: boolean;
  loading: boolean;
  children: ReactNode;
  baseChainsHeader: ReactNode;
}

export const BaseChains = ({
  top,
  shouldShowReminderDialog,
  loading,
  baseChainsHeader,
  children,
}: BaseChainsProps) => {
  const { classes } = useBaseChainsStyles();

  return (
    <Box className={classes.root}>
      {top}

      {loading ? (
        <ChainsSkeleton />
      ) : (
        <>
          {baseChainsHeader}
          {children}
        </>
      )}
      {shouldShowReminderDialog && <ReminderDialog />}
    </Box>
  );
};
