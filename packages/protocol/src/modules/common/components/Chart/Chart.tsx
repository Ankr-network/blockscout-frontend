import React, { ReactNode } from 'react';
import { useTheme } from '@material-ui/core';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BaseAxisProps } from 'recharts/types/util/types';
import classNames from 'classnames';

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
  loading?: boolean;
}

const ANIMATION_DURATION = 500;

export const Chart = ({
  data,
  tooltipContent,
  xAxisTickFormatter,
  yAxisTickFormatter,
  loading,
}: IChartProps) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ResponsiveContainer className={classes.root} width="99%" height={270}>
      <AreaChart
        width={0}
        className={classNames(classes.chart, loading ? classes.loading : null)}
        data={data}
        margin={MARGIN}
      >
        <defs>
          <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.primary.main} />
            <stop offset="0%" stopColor="#f4f9ff" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="extraValueColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.primary.main} />
            <stop offset="0%" stopColor="#f4f9ff" />
          </linearGradient>
        </defs>
        <CartesianGrid
          style={{ stroke: theme.palette.background.default }}
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
          width={80}
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
          type="monotone"
          animationDuration={ANIMATION_DURATION}
        />
        <Area
          dataKey="extraValue"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          fill="url(#extraValueColor)"
          strokeDasharray="3"
          type="monotone"
          animationDuration={ANIMATION_DURATION}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
