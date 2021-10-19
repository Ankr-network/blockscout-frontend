import React from 'react';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { CreateRpcButton } from 'modules/common/components/CreateRpcButton';
import { DepositTitles } from '../DepositTitles';

import { useStyles } from './useStyles';
import { Link as RouterLink } from 'react-router-dom';
import { DashboardRoutesConfig } from '../../../../../dashboard/Routes';

export const ProBlock = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DepositTitles
        topTitle={t('plan.pro.title')}
        bottomTitle={tHTML('plan.pro.subtitle')}
      />
      <CreateRpcButton
        className={classes.button}
        component={RouterLink}
        to={DashboardRoutesConfig.dashboard.generatePath()}
      />
    </div>
  );
};
