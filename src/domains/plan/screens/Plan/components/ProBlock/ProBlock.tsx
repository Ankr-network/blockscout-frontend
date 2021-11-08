import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { DashboardRoutesConfig } from 'domains/dashboard/Routes';
import { DepositTitles } from '../DepositTitles';
import { useStyles } from './useStyles';

/* was used on plan page for redirect to private RPCs.
 * since plan and dashboard routes merged, is not used anymore */
export const ProBlock = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DepositTitles
        topTitle={t('plan.pro.title')}
        bottomTitle={tHTML('plan.pro.subtitle')}
        isBottomTitleFullWidth
      />

      <Button
        color="primary"
        className={classes.button}
        component={RouterLink}
        to={DashboardRoutesConfig.dashboard.generatePath()}
      >
        {t('pro-block.label')}
      </Button>
    </div>
  );
};
