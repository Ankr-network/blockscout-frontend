import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material';
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

import { useStyles } from './ChartStyles';
import { MARGIN } from './ChartUtils';
import { useYAxisWidth } from './hooks/useYAxisWidth';

export interface IChartData {
  time: Date;
  value?: string | number;
  extraValue?: string | number;
}

export interface IChartProps {
  data: IChartData[];
  tooltipContent?: ReactNode;
  xAxisTickFormatter?: BaseAxisProps['tickFormatter'];
  yAxisTickFormatter?: BaseAxisProps['tickFormatter'];
  loading?: boolean;
  hasFixedHeight?: boolean;
}

const ANIMATION_DURATION = 500;
const FIXED_HEIGHT = 270;

export const Chart = ({
  data,
  tooltipContent,
  xAxisTickFormatter,
  yAxisTickFormatter,
  loading,
  hasFixedHeight = true,
}: IChartProps) => {
  const [ref, yAxisWidth] = useYAxisWidth();

  const theme = useTheme();
  const { classes, cx } = useStyles();

  return (
    <ResponsiveContainer
      className={classes.root}
      width="99%"
      height={hasFixedHeight ? FIXED_HEIGHT : undefined}
      ref={ref}
    >
      <AreaChart
        width={0}
        className={cx(classes.chart, loading ? classes.loading : null)}
        data={data}
        margin={MARGIN}
      >
        <defs>
          <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1" />
        </defs>
        <defs>
          <linearGradient id="extraValueColor" x1="0" y1="0" x2="0" y2="1" />
        </defs>
        <CartesianGrid
          style={{ stroke: theme.palette.grey[100] }}
          strokeWidth={1}
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
          width={yAxisWidth}
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
