import React from 'react';
import { Typography } from '@material-ui/core';
import { useNoDataStyles } from './useNoDataStyles';
import { t } from 'common';

export const NoData = () => {
  const classes = useNoDataStyles();

  return (
    <Typography variant="body2" className={classes.content}>
      {t('chain-item.no-data')}
    </Typography>
  );
};
