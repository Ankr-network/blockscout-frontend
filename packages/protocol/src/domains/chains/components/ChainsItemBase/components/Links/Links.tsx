import { Box, Typography } from '@mui/material';
import { Lock } from '@ankr.com/ui';
import { ReactNode } from 'react';
import { t } from '@ankr.com/common';

import { useLinksStyles } from './LinksStyles';

export interface LinksProps {
  children: ReactNode;
  hasPremiumDialog?: boolean;
}

export const Links = ({ children, hasPremiumDialog }: LinksProps) => {
  const { classes } = useLinksStyles();

  const premiumOnlyContent = (
    <Box className={classes.premiumOnlyContent}>
      <Typography className={classes.premiumOnlyText} variant="subtitle1">
        {t('chains.for-premium-only')}
      </Typography>
      <Lock className={classes.premiumOnlyIcon} />
    </Box>
  );

  return (
    <div className={classes.root}>
      {hasPremiumDialog ? premiumOnlyContent : children}
    </div>
  );
};
