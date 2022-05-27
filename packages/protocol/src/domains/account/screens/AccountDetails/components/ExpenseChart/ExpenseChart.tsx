import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';

import { Chart } from './Chart';
import { TimeframeSelector } from './TimeframeSelector/TimeframeSelector';
import { i18nKeyRoot } from './ExpenseChartUtils';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ExpenseChartStyles';
import { ExpenseChartTimeframe } from './types';

export const ExpenseChart = () => {
  const [timeframe, setTimeframe] = useState(ExpenseChartTimeframe.OneWeek);

  const onTimeframeSelect = useCallback((value: ExpenseChartTimeframe) => {
    setTimeframe(value);
  }, []);

  const classes = useStyles();

  return (
    <Box className={classes.expenseChartRoot}>
      <div className={classes.header}>
        <div className={classes.left}>
          <span className={classes.title}>{t(`${i18nKeyRoot}.title`)}</span>
          <div className={classes.currency}>ANKR</div>
        </div>
        <div className={classes.timeframeSelector}>
          <TimeframeSelector onChange={onTimeframeSelect} />
        </div>
      </div>
      <Chart timeframe={timeframe} />
    </Box>
  );
};
