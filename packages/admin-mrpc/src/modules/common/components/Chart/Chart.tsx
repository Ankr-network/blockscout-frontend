import React, { ReactNode } from 'react';

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
import { useYAxisWidth } from './hooks/useYAxisWidth';
import { getTheme } from '../../utils/getTheme';

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
  isChartDataLoading?: boolean;
}

const ANIMATION_DURATION = 500;

export const Chart = ({
  data,
  tooltipContent,
  xAxisTickFormatter,
  yAxisTickFormatter = () => '',
  isChartDataLoading,
}: IChartProps) => {
  const [ref, yAxisWidth] = useYAxisWidth();

  const valuesArray: number[] = data.map(dataItem => {
    return Number(dataItem.value);
  });
  const maxValueY = Math.max(...valuesArray);
  const theme = getTheme();
  const { classes } = useStyles();

  return (
    <ResponsiveContainer
      className={classes.root}
      width="99%"
      height={270}
      ref={ref}
    >
      <AreaChart
        width={0}
        className={classNames(
          classes.chart,
          isChartDataLoading ? classes.loading : null,
        )}
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
          type="number"
          width={yAxisWidth}
          tickLine={false}
          tick={{ fill: theme.palette.text.secondary, dx: -5 }}
          stroke=""
          tickFormatter={yAxisTickFormatter}
          domain={[0, maxValueY]}
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
