import React from 'react';
import { Typography } from '@mui/material';
import { useNoDataStyles } from './useNoDataStyles';
import { t } from '@ankr.com/common';

export const NoData = () => {
  const { classes } = useNoDataStyles();

  return (
    <Typography variant="body2" className={classes.content}>
      {t('chain-item.no-data')}
    </Typography>
  );
};
