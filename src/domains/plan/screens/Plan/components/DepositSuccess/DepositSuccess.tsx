import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { EmailForm } from './EmailForm';
import { useStyles } from './useStyles';

const HAS_EMAIL = false;

export const DepositSuccess = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.topTitle} color="primary">
        {t('plan.deposit-success.title')}
      </Typography>
      {HAS_EMAIL && (
        <Typography variant="h1" className={classes.bottomTitle}>
          {tHTML('plan.deposit-success.subtitle')}
        </Typography>
      )}
      {HAS_EMAIL ? (
        <EmailForm />
      ) : (
        <Button color="primary" className={classes.button}>
          {tHTML('plan.deposit-success.email-form.done-button')}
        </Button>
      )}
    </div>
  );
};
