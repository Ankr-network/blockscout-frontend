import React, { ReactNode, useMemo } from 'react';
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
  shouldShowZeroValues?: boolean;
}

export interface IChartProps {
  data: IChartData[];
  tooltipContent?: ReactNode;
  xAxisTickFormatter?: BaseAxisProps['tickFormatter'];
  yAxisTickFormatter?: BaseAxisProps['tickFormatter'];
  loading?: boolean;
  height?: number;
  hasFixedHeight?: boolean;
  hasHorizontalLines?: boolean;
  width?: string | number;
  isDisabledColor?: boolean;
}

const ANIMATION_DURATION = 500;
const FIXED_HEIGHT = 270;
const Y_AXIS_MARGIN = 15;
const WIDTH = '99%';

export const Chart = ({
  data,
  tooltipContent,
  xAxisTickFormatter,
  yAxisTickFormatter,
  loading,
  height = FIXED_HEIGHT,
  hasFixedHeight = true,
  hasHorizontalLines = true,
  width = WIDTH,
  isDisabledColor,
}: IChartProps) => {
  const [ref, yAxisWidth] = useYAxisWidth();

  const theme = useTheme();
  const { classes, cx } = useStyles();

  const strokeColor = useMemo(() => {
    if (isDisabledColor) {
      return theme.palette.grey[400];
    }

    return theme.palette.primary.main;
  }, [isDisabledColor, theme]);

  return (
    <ResponsiveContainer
      className={classes.root}
      width={width}
      height={hasFixedHeight ? height : undefined}
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
          horizontal={hasHorizontalLines}
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
          width={yAxisWidth + Y_AXIS_MARGIN}
        />
        {tooltipContent && <Tooltip content={tooltipContent as any} />}
        <Area
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          fill="url(#valueColor)"
          type="monotone"
          animationDuration={ANIMATION_DURATION}
        />
        <Area
          dataKey="extraValue"
          stroke={strokeColor}
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
