import { useCallback } from 'react';
import { Typography, useTheme } from '@mui/material';
import { t } from '@ankr.com/common';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Payload, Props } from 'recharts/types/component/DefaultLegendContent';
import { Timeframe } from '@ankr.com/chains-list';

import { StatusCircle } from 'uiKit/StatusCircle';
import { useTimeframe } from 'domains/chains/hooks/useTimeframe';
import { TopRequestsResultData, useStakeBarChart } from 'modules/common';

import { COLOR_LIST } from './StakeBarChartUtils';
import { Tooltip as StakeBarTooltip } from './Tooltip';
import { useStakeBarChartStyles } from './useStakBarChartStyles';
import { useXTickFormatter } from './hooks/useXTickFormatter';

interface IStakebarProps {
  result: TopRequestsResultData;
  timeframe: Timeframe;
}

const FIRST_BAR_RADIUS: [number, number, number, number] = [8, 8, 0, 0];

export const StakeBarChart = ({
  result,
  timeframe: timeframe_,
}: IStakebarProps) => {
  const theme = useTheme();
  const { classes, cx } = useStakeBarChartStyles();
  const { timeframe } = useTimeframe(timeframe_, [
    result.data && result.data.length,
  ]);

  const { data, handleClickLegend, selectedKey } = useStakeBarChart(
    result,
    timeframe,
  );

  const renderLegendContent = useCallback(
    ({ payload }: Props) => {
      if (!payload) return null;

      return (
        <div className={classes.legendRoot}>
          {payload.reverse().map((item: Payload) => {
            const { color, value } = item;

            return (
              <Typography
                component="div"
                variant="body2"
                key={JSON.stringify(item)}
                className={cx(
                  classes.legend,
                  value in selectedKey && classes.selected,
                )}
                onClick={() => handleClickLegend(item)}
              >
                <StatusCircle color={color} mr={0.75} />
                {value}
              </Typography>
            );
          })}
        </div>
      );
    },
    [
      cx,
      selectedKey,
      classes.legendRoot,
      classes.legend,
      classes.selected,
      handleClickLegend,
    ],
  );

  const xTickFormatter = useXTickFormatter(timeframe, data);

  const yTickFormatter = (value: number) => {
    return t('chain-item.method-calls.y-axis', { value });
  };

  return (
    <ResponsiveContainer width="100%" height={500} className={classes.root}>
      <BarChart
        width={500}
        height={300}
        data={data}
        barSize={40}
        margin={{ left: 0, right: 12 }}
        reverseStackOrder
      >
        <XAxis
          interval={0}
          dataKey="name"
          tickLine={false}
          tickFormatter={xTickFormatter}
        />
        <YAxis
          tickLine={false}
          tick={{ fill: theme.palette.text.secondary }}
          stroke=""
          tickFormatter={yTickFormatter}
          width={50}
        />
        <CartesianGrid
          style={{
            stroke: theme.palette.grey[100],
            fill: theme.palette.text.secondary,
          }}
          strokeWidth={1}
          horizontal
          vertical={false}
        />
        <Tooltip cursor={false} content={<StakeBarTooltip />} />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={6}
          content={renderLegendContent}
        />
        {result.list.map((name: string, index: number) => (
          <Bar
            key={name || index}
            dataKey={name}
            stackId="method-calls"
            fill={COLOR_LIST[index]}
            radius={index === 0 ? FIRST_BAR_RADIUS : 0}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
