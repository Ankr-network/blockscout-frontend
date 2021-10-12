import React, { ReactNode } from 'react';
import { useTheme } from '@material-ui/core';
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { BaseAxisProps } from 'recharts/types/util/types';

import { useStyles } from './ChartStyles';
import { MARGIN } from './ChartUtils';

export interface IChartData {
  time: Date;
  value?: string | number;
  extraValue?: string | number;
}

interface IChartProps {
  data: IChartData[];
  tooltipContent?: ReactNode;
  xAxisTickFormatter?: BaseAxisProps['tickFormatter'];
  yAxisTickFormatter?: BaseAxisProps['tickFormatter'];
}

export const Chart = ({
  data,
  tooltipContent,
  xAxisTickFormatter,
  yAxisTickFormatter,
}: IChartProps) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ResponsiveContainer className={classes.root} height={270}>
      <AreaChart className={classes.chart} data={data} margin={MARGIN}>
        <defs>
          <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.primary.main} />
            <stop offset="0%" stopColor="#f4f9ff" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="extraValueColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.error.main} />
            <stop offset="0%" stopColor="#f4f9ff" />
          </linearGradient>
        </defs>
        <CartesianGrid
          style={{ stroke: theme.palette.background.paper }}
          strokeWidth={2}
          horizontal
          vertical={false}
        />
        <XAxis
          dataKey="time"
          tickLine
          tick={{ fill: theme.palette.text.secondary, dy: 10 }}
          stroke=""
          tickFormatter={xAxisTickFormatter}
        />
        <YAxis
          tickLine={false}
          tick={{ fill: theme.palette.text.secondary, dx: -5 }}
          stroke=""
          tickFormatter={yAxisTickFormatter}
        />
        {tooltipContent && <Tooltip content={tooltipContent as any} />}
        <Area
          dataKey="value"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          fill="url(#valueColor)"
        />
        <Area
          dataKey="extraValue"
          stroke={theme.palette.error.main}
          strokeWidth={2}
          fill="url(#extraValueColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
