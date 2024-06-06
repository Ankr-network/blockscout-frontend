import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ScaleType } from 'recharts/types/util/types';
import { useTheme } from '@mui/material';
import { useYAxisWidth } from '@ankr.com/telemetry';

import { useIsXLDown } from 'uiKit/Theme/useTheme';

import { IRequestsData } from '../../utils/requestsBannerUtils';
import { useActiveBarIndex } from './hooks/useActiveBarIndex';
import { useRequestsChart } from './hooks/useRequestsChart';
import { useRequestsChartStyles } from './useRequestsChartStyles';
import {
  ACTIVE_BAR_OPACITY,
  BAR_OPACITY,
  BAR_RADIUS,
  CHART_HEIGHT,
} from './const';

export interface IRequestsChartProps {
  data: IRequestsData[];
}

interface IChartProps extends IRequestsChartProps {
  tickFormatter: (value: number) => string;
  barMetaList: { fill: string; name: string }[];
  tooltipContent: JSX.Element;
  yAxisScale?: ScaleType;
}

const BAR_MARGIN = { top: 5, right: 20, bottom: 5, left: -10 };

const Y_AXIS_MARGIN = 10;

export const RequestsChart = ({
  barMetaList,
  data,
  tickFormatter,
  tooltipContent,
  yAxisScale = 'auto',
}: IChartProps) => {
  const theme = useTheme();

  const { classes } = useRequestsChartStyles();

  const { activeBarIndex, handleMouseMove } = useActiveBarIndex();

  const { barWidth } = useRequestsChart();

  const [ref, yAxisWidth] = useYAxisWidth();

  const isXLDown = useIsXLDown();

  const isEmpty = useMemo(
    () => data.every(item => item.total === 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data[0].timestamp],
  );

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
          interval="preserveEnd"
        />
        <YAxis
          tick={{ fill: theme.palette.grey[600] }}
          stroke=""
          tickFormatter={tickFormatter}
          width={yAxisWidth + Y_AXIS_MARGIN}
          fontSize={12}
          scale={yAxisScale}
        />
        <Tooltip cursor={false} content={tooltipContent} />
        <ReferenceLine y={0} stroke={theme.palette.divider} />
        {barMetaList.map(({ fill, name }) => (
          <Bar
            key={name}
            dataKey={name}
            fill={fill}
            stackId="requests"
            radius={BAR_RADIUS}
          >
            {!isEmpty &&
              data.map((entry, index) => (
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
