import React from 'react';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { DepositTitles } from '../DepositTitles';

import { useStyles } from './useStyles';
import { Link as RouterLink } from 'react-router-dom';
import { DashboardRoutesConfig } from '../../../../../dashboard/Routes';
import { Button } from '@material-ui/core';
import { StarIcon } from '../../../../../../uiKit/Icons/StarIcon';

export const ProBlock = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DepositTitles
        topTitle={t('plan.pro.title')}
        bottomTitle={tHTML('plan.pro.subtitle')}
      />

      <Button
        color="primary"
        startIcon={<StarIcon />}
        className={classes.button}
        component={RouterLink}
        to={DashboardRoutesConfig.dashboard.generatePath()}
      >
        {t('pro-block.label')}
      </Button>
    </div>
  );
};
