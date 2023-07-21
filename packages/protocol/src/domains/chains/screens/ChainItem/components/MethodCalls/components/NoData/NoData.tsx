import React from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useNoDataStyles } from './useNoDataStyles';

export const NoData = () => {
  const { classes } = useNoDataStyles();

  return (
    <Typography variant="body2" className={classes.content}>
      {t('chain-item.no-data')}
    </Typography>
  );
};
