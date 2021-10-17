import React, { useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { EmailForm } from './EmailForm';
import { useStyles } from './useStyles';
import { useDispatchRequest } from '@redux-requests/react';
import { completeDeposit } from '../../../../../../modules/auth/actions/completeDeposit';

const HAS_EMAIL = false;

export const DepositSuccess = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  const handleComplete = useCallback(() => {
    dispatchRequest(completeDeposit());
  }, [dispatchRequest]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.topTitle} color="primary">
        {t('plan.deposit-success.title')}
      </Typography>
      {HAS_EMAIL && (
        <Typography variant="h3">
          {tHTML('plan.deposit-success.subtitle')}
        </Typography>
      )}
      {HAS_EMAIL ? (
        <EmailForm />
      ) : (
        <Button
          color="primary"
          className={classes.button}
          onClick={handleComplete}
        >
          {tHTML('plan.deposit-success.email-form.done-button')}
        </Button>
      )}
    </div>
  );
};
