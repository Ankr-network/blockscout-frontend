import React from 'react';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositTitles } from '../DepositTitles';

import { useStyles } from './useStyles';
import { Link as RouterLink } from 'react-router-dom';
import { DashboardRoutesConfig } from '../../../../../dashboard/Routes';
import { Button } from '@material-ui/core';

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
