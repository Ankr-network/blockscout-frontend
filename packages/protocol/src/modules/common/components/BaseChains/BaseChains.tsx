import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { ChainsSkeleton } from 'domains/chains/screens/ChainsListPage/components/ChainsSkeleton';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useBaseChainsStyles } from './BaseChainsStyles';
import { baseChainsTranslation } from './translation';

interface BaseChainsProps {
  top?: ReactNode;
  loading: boolean;
  children: ReactNode;
}

export const BaseChains = ({ children, loading, top }: BaseChainsProps) => {
  const { classes } = useBaseChainsStyles();

  const { keys, t } = useTranslation(baseChainsTranslation);

  return (
    <Box className={classes.baseChainsRoot}>
      {top}
      <Typography
        color="textPrimary"
        variant="h5"
        className={classes.baseChainsTitle}
      >
        {t(keys.title)}
      </Typography>
      {loading ? <ChainsSkeleton /> : <>{children}</>}
    </Box>
  );
};
