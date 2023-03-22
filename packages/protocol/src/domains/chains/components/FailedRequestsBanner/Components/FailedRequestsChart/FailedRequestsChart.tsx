import { useCallback } from 'react';
import { useTheme } from '@mui/material';
import { t } from '@ankr.com/common';
import {
  Bar,
  BarChart,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

import { useFailedRequestsChartStyles } from './useFailedRequestsChartStyles';
import {
  intlFailedRequestsBannerRoot,
  Tooltip as BarTooltip,
} from '../Tooltip';
import { useActiveBarIndex } from './hooks/useActiveBarIndex';
import { useFailedRequestsChart } from '../../hooks/useFailedRequestsChart';
import { IFailedRequestsData } from 'domains/chains/utils/failedRequestsBannerUtils';
import {
  ACTIVE_BAR_OPACITY,
  BAR_OPACITY,
  CHART_HEIGHT,
  BAR_RADIUS,
} from '../../const';
import { useChartBar } from './hooks/useChartBar';
import { useYAxisWidth } from 'modules/common/components/Chart/hooks/useYAxisWidth';
import { useIsXLDown } from 'uiKit/Theme/useTheme';

interface IFailedRequestsChartProps {
  data: IFailedRequestsData[];
}

const BAR_MARGIN = { top: 5, right: 20, bottom: 5, left: -10 };

const Y_AXIS_MARGIN = 10;

export const FailedRequestsChart = ({ data }: IFailedRequestsChartProps) => {
  const theme = useTheme();

  const { classes } = useFailedRequestsChartStyles();

  const { activeBarIndex, handleMouseMove } = useActiveBarIndex();

  const { barWidth } = useFailedRequestsChart();

  const barMetaList = useChartBar(theme);

  const [ref, yAxisWidth] = useYAxisWidth();

  const tickFormatter = useCallback(
    (value: number) =>
      t(`${intlFailedRequestsBannerRoot}.value`, {
        value: Math.abs(value),
      }),
    [],
  );

  const isXLDown = useIsXLDown();

  return (
    <ResponsiveContainer
      width="100%"
      height={CHART_HEIGHT + (isXLDown ? 20 : 0)}
      className={classes.root}
      ref={ref}
    >
      <BarChart
        data={data}
        barSize={barWidth}
        stackOffset="sign"
        onMouseMove={handleMouseMove}
        margin={BAR_MARGIN}
      >
        <CartesianGrid
          strokeDasharray="3"
          vertical={false}
          stroke={theme.palette.grey[100]}
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          tick={{ fill: theme.palette.grey[600] }}
          fill={theme.palette.grey[600]}
          stroke=""
          fontSize={12}
          tickMargin={15}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: theme.palette.grey[600] }}
          stroke=""
          tickFormatter={tickFormatter}
          width={yAxisWidth + Y_AXIS_MARGIN}
          fontSize={12}
          scale="linear"
        />
        <Tooltip cursor={false} content={<BarTooltip />} />
        <ReferenceLine y={0} stroke={theme.palette.divider} />
        {barMetaList.map(item => (
          <Bar
            key={item.name}
            dataKey={item.name}
            fill={item.fill}
            stackId="failed-requests"
            radius={BAR_RADIUS}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.timestamp}
                opacity={
                  activeBarIndex === index ? ACTIVE_BAR_OPACITY : BAR_OPACITY
                }
              />
            ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};