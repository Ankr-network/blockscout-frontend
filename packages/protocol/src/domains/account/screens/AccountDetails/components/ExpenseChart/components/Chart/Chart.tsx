import React from 'react';
import { Box } from '@mui/material';

import {
  Chart as BaseChart,
  IChartData,
} from 'modules/common/components/Chart';
import { ChartCurrency } from '../../types';
import { Tooltip } from '../Tooltip';

import { useStyles } from './ChartStyles';

export interface ChartProps {
  currency: ChartCurrency;
  isLoading: boolean;
  transactions: IChartData[];
  xFormatter: (value: Date) => string;
  yFormatter: (value: number) => string;
}

export const Chart = ({
  currency,
  isLoading,
  transactions,
  xFormatter,
  yFormatter,
}: ChartProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.chartRoot}>
      <BaseChart
        data={transactions}
        loading={isLoading}
        tooltipContent={<Tooltip currency={currency} />}
        xAxisTickFormatter={xFormatter}
        yAxisTickFormatter={yFormatter}
      />
    </Box>
  );
};
