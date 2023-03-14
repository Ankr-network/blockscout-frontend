import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { t } from '@ankr.com/common';

import { PageHeader } from 'modules/common/components/PageHeader';
import { useBaseChainsStyles } from './BaseChainsStyles';
import { ReminderDialog } from '../ReminderDialog';
import { ChainsSkeleton } from 'domains/chains/screens/Chains/components/ChainsSkeleton';

interface BaseChainsProps {
  top?: ReactNode;
  shouldShowReminderDialog?: boolean;
  loading: boolean;
  select: ReactNode;
  children: ReactNode;
}

export const BaseChains = ({
  top,
  shouldShowReminderDialog,
  loading,
  select,
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
          <PageHeader title={t('chains.title')} select={select} />
          {children}
        </>
      )}
      {shouldShowReminderDialog && <ReminderDialog />}
    </Box>
  );
};
