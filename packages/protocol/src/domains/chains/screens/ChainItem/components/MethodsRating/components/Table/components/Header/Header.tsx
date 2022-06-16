import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerRoot}>
      <span>{t('chain-item.methods-rating.table.methods-title')}</span>
      <span>{t('chain-item.methods-rating.table.requests-title')}</span>
    </div>
  );
};
