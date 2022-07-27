import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './RequestsChartPlaceholderStyles';

export const RequestsChartPlaceholder = () => {
  const classes = useStyles();

  return (
    <div className={classes.requestsChartPlaceholder}>
      <div className={classes.title}>
        {t('chain-item.chart.placeholder.title')}
      </div>
      <div className={classes.subtitle}>
        {t('chain-item.chart.placeholder.subtitle')}
      </div>
    </div>
  );
};
