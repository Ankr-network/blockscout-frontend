import { Typography } from '@material-ui/core';
import { t } from 'common';
import React from 'react';
import { useNoDataStyles } from './useNoDataStyles';

export const NoData = () => {
  const classes = useNoDataStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {t('chain-item.method-calls.no-data.title')}
      </Typography>
      <Typography variant="body2" className={classes.content}>
        {t('chain-item.method-calls.no-data.content')}
      </Typography>
    </div>
  );
};
