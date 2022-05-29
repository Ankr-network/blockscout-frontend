import React from 'react';
import { Box } from '@material-ui/core';

import { ChartCurrency } from '../../types';
import { IChartData } from 'modules/common/components/Chart';
import { currenciesMap, root } from '../../const';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './TooltipStyles';

interface Payload {
  value: number;
  payload: IChartData;
}

interface TooltipProps {
  currency: ChartCurrency;
  active?: boolean;
  payload?: Payload[];
}

export const Tooltip = ({ active, currency, payload }: TooltipProps) => {
  const classes = useStyles();

  const isActive = active && payload && payload.length > 0;

  return isActive ? (
    <Box className={classes.tooltipRoot}>
      <div className={classes.value}>
        {payload[0].payload.value} {currenciesMap[currency]}
      </div>
      <div className={classes.time}>
        {t(`${root}.chart.medium-date`, { value: payload[0].payload.time })}
      </div>
    </Box>
  ) : null;
};
