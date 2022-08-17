import React, { useCallback } from 'react';
import { Typography, useTheme } from '@material-ui/core';

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
import { useStakeBarChartStyles } from './useStakBarChartStyles';
import { Tooltip as StakeBarTooltip } from './Tooltip';
import { COLOR_LIST } from './StakeBarChartUtils';
import classNames from 'classnames';
import { StatusCircle } from 'uiKit/StatusCircle';
import { t } from 'modules/i18n/utils/intl';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { useTimeframe } from 'domains/chains/hooks/useStatsTimeframe';
import { useStakeBarChart } from 'modules/common/hooks/useStakeBarChart';
import { StatsTimeframe } from 'domains/chains/types';

interface IStakebarProps {
  result: TopRequestsResultData;
  timeframe: StatsTimeframe;
}

const NUMBER_OF_SHOW_X_TICK = 4;

export const StakeBarChart = ({
  result,
  timeframe: timeframe_,
}: IStakebarProps) => {
  const theme = useTheme();
  const classes = useStakeBarChartStyles();

  const { timeframe } = useTimeframe(timeframe_, [
    result.data && result.data.length,
  ]);

  const { data, selectedKey, handleClickLegend } = useStakeBarChart(
    result,
    timeframe,
  );

  const renderLegendContent = useCallback(
    ({ payload }: Props) => {
      if (payload) {
        return (
          <div className={classes.legendRoot}>
            {payload.reverse().map((item: Payload) => {
              const { value, color } = item;

              return (
                <Typography
                  component="div"
                  variant="body2"
                  key={value}
                  className={classNames(
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
      }

      return null;
    },
    [
      selectedKey,
      classes.legendRoot,
      classes.legend,
      classes.selected,
      handleClickLegend,
    ],
  );

  const xTickFormatter = useCallback(
    (value: string, index: number) => {
      const totalNum = data.length;

      if (totalNum < NUMBER_OF_SHOW_X_TICK) {
        return value;
      }

      if (timeframe !== StatsTimeframe.WEEK) {
        // in 24 hours' and 30 days' diagram, we need to show 4 date label on the x-axis, and we should keep the same space between each date label.
        const hideNum = Math.floor(
          (totalNum - 1) / (NUMBER_OF_SHOW_X_TICK - 1),
        );
        const hasOverflow = index > (NUMBER_OF_SHOW_X_TICK - 2) * hideNum;

        return (index % hideNum === 0 && !hasOverflow) || index === totalNum - 1
          ? value
          : '';
      }

      return value;
    },
    [timeframe, data],
  );

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
        margin={{ left: 0 }}
        reverseStackOrder
      >
        <XAxis dataKey="name" tickLine={false} tickFormatter={xTickFormatter} />
        <YAxis
          tickLine={false}
          tick={{ fill: theme.palette.text.secondary }}
          stroke=""
          tickFormatter={yTickFormatter}
          width={50}
        />
        <CartesianGrid
          style={{
            stroke: theme.palette.background.default,
            fill: theme.palette.text.secondary,
          }}
          strokeWidth={2}
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
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
