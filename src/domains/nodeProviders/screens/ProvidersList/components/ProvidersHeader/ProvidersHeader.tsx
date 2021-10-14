import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ProvidersHeaderStyles';

export const ProvidersHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography variant="h5" noWrap className={classes.title}>
          {t('providers.title')}
        </Typography>
        {/* TODO: */}
      </div>
      <Button
        variant="text"
        color="primary"
        className={classes.button}
        disableElevation={false}
        disabled
      >
        {t('providers.integrate-button')}
      </Button>
    </div>
  );
};
