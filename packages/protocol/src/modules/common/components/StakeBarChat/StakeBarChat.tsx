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
import { useStakeBarChartStyles } from './useStakBarChartStyles';
import { Tooltip as StakeBarTooltip } from './Tooltip';
import { COLOR_LIST } from './StakeBarChartUtils';
import classNames from 'classnames';
import { StatusCircle } from 'uiKit/StatusCircle';
import { t } from 'modules/i18n/utils/intl';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { useStakeBarChart } from 'modules/common/hooks/useStakeBarChart';
import { StatsTimeframe } from 'domains/chains/types';

interface IStakebarProps {
  result: TopRequestsResultData;
  timeframe: StatsTimeframe;
}

export const StakeBarChart = ({ result, timeframe }: IStakebarProps) => {
  const theme = useTheme();
  const classes = useStakeBarChartStyles();
  const { data, selectedKey, handleClickLegend } = useStakeBarChart(
    result,
    timeframe,
  );

  const renderLegendText = useCallback(
    (value: string, entry: any) => {
      const { dataKey, color } = entry;

      return (
        <Typography
          component="div"
          variant="body2"
          className={classNames(
            classes.legend,
            dataKey in selectedKey && classes.selected,
          )}
        >
          <StatusCircle color={color} mr={0.75} />
          {value}
        </Typography>
      );
    },
    [selectedKey, classes.legend, classes.selected],
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
      >
        <XAxis dataKey="name" tickLine={false} />
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
          formatter={renderLegendText}
          onClick={handleClickLegend}
        />
        {result.list.map((name: string, index: number) => (
          <Bar
            key={name}
            dataKey={name}
            stackId="method-calls"
            fill={COLOR_LIST[index]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
