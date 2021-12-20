import React from 'react';
import { Typography } from '@material-ui/core';

import { IChartData } from 'modules/common/components/Chart';
import { formatDate } from '../ChainRequestsChartUtils';
import { useStyles } from './ChartTooltipStyles';

interface IChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: IChartData;
  }>;
}

export const ChartTooltip = ({ active, payload }: IChartTooltipProps) => {
  const classes = useStyles();

  if (!(active && payload && payload.length > 0)) return null;

  const item = payload[0].payload;

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="body2" className={classes.value}>
          {(item.value || item.extraValue) ?? 0}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography variant="body1" className={classes.time}>
          {formatDate(item.time)}
        </Typography>
      </div>
    </div>
  );
};
