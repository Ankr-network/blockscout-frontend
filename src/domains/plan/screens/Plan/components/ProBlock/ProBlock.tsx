import React from 'react';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { CreateRpcButton } from 'modules/common/components/CreateRpcButton';
import { DepositTitles } from '../DepositTitles';

import { useStyles } from './useStyles';

export const ProBlock = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DepositTitles
        topTitle={t('plan.pro.title')}
        bottomTitle={tHTML('plan.pro.subtitle')}
      />
      <CreateRpcButton className={classes.button} />
    </div>
  );
};
