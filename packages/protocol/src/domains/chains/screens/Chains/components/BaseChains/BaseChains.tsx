import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';
import { useBaseChainsStyles } from './BaseChainsStyles';

interface BaseChainsProps {
  top?: ReactNode;
  loading: boolean;
  select: ReactNode;
  children: ReactNode;
}

export const BaseChains = ({
  top,
  loading,
  select,
  children,
}: BaseChainsProps) => {
  const { classes } = useBaseChainsStyles();

  return (
    <>
      {top}
      <PageHeader title={t('chains.title')} select={select} />
      <Box className={classes.container}>
        {loading ? <OverlaySpinner /> : children}
      </Box>
    </>
  );
};
