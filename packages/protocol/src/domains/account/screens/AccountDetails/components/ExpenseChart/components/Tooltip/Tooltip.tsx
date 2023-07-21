import React from 'react';
import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { IChartData } from 'modules/common/components/Chart';

import { ChartCurrency } from '../../types';
import { currenciesMap, root } from '../../const';
import { formatNumber } from './utils/formatNumber';
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
  const { classes } = useStyles();

  if (!(active && payload && payload.length > 0)) return null;

  return (
    <Box className={classes.tooltipRoot}>
      <div className={classes.value}>
        {formatNumber(payload[0].payload.value, currency)}{' '}
        {currenciesMap[currency]}
      </div>
      <div className={classes.time}>
        {t(`${root}.chart.medium-date`, { value: payload[0].payload.time })}
      </div>
    </Box>
  );
};
