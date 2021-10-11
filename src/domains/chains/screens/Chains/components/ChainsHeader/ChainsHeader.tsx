import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from '../ChainsSortSelect';
import { useStyles } from './ChainsHeaderStyles';

export const ChainsHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography variant="h4" noWrap className={classes.title}>
          {t('chains.title')}
        </Typography>
        <ChainsSortSelect />
      </div>
      <Button
        variant="text"
        color="primary"
        className={classes.button}
        disableElevation={false}
        disabled
      >
        {t('chains.integrate-button')}
      </Button>
    </div>
  );
};
