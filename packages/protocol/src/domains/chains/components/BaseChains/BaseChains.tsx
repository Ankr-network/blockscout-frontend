import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { PageHeader } from 'modules/common/components/PageHeader';
import { useBaseChainsStyles } from './BaseChainsStyles';
import { ReminderDialog } from '../ReminderDialog';

interface BaseChainsProps {
  top?: ReactNode;
  isShowReminderDialog?: boolean;
  loading: boolean;
  select: ReactNode;
  children: ReactNode;
}

export const BaseChains = ({
  top,
  isShowReminderDialog,
  loading,
  select,
  children,
}: BaseChainsProps) => {
  const { classes } = useBaseChainsStyles();

  return (
    <Box className={classes.root}>
      {top}
      <PageHeader title={t('chains.title')} select={select} />
      <Box className={classes.container}>
        {loading ? <OverlaySpinner /> : children}
      </Box>
      {isShowReminderDialog && <ReminderDialog />}
    </Box>
  );
};
