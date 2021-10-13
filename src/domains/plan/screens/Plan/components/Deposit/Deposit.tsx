import React from 'react';
import { Typography, Divider } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositAgreementForm } from './DepositAgreementForm';
import { DepositTitles } from '../DepositTitles';
import { useStyles } from './useStyles';

export const Deposit = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DepositTitles
        topTitle={t('plan.deposit.title')}
        bottomTitle={tHTML('plan.deposit.subtitle')}
        className={classes.left}
      />
      <div className={classes.right}>
        <div className={classes.top}>
          <Typography variant="h4" className={classes.info}>
            {tHTML('plan.deposit.advantages.private-endpoints')}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            {tHTML('plan.deposit.advantages.prioritized-requests')}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            {tHTML('plan.deposit.advantages.websockets')}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <DepositAgreementForm />
      </div>
    </div>
  );
};
