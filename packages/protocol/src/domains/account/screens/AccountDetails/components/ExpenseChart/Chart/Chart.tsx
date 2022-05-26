import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';

import { Chart as BaseChart } from 'modules/common/components/Chart';
import { ExpenseChartTimeframe } from '../types';
import { Tooltip } from './Tooltip';
import { formatDateMap, mockedDataMap } from './ChartUtils';
import { i18nKeyRoot } from '../ExpenseChartUtils';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ChartStyles';

export interface ChartProps {
  timeframe: ExpenseChartTimeframe;
}

export const Chart = ({ timeframe }: ChartProps) => {
  const data = mockedDataMap[timeframe];

  const classes = useStyles();

  const expensesFormatter = useCallback(
    (value: number) => t(`${i18nKeyRoot}.chart.expense`, { value }),
    [],
  );
  const tickFormatter = useCallback(
    (value: Date) => formatDateMap[timeframe](value),
    [timeframe],
  );

  return (
    <Box className={classes.chartRoot}>
      <BaseChart
        data={data}
        tooltipContent={<Tooltip />}
        xAxisTickFormatter={tickFormatter}
        yAxisTickFormatter={expensesFormatter}
      />
    </Box>
  );
};
