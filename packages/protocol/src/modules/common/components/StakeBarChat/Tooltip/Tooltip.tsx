import React from 'react';
import { Typography } from '@material-ui/core';
import { useTooltipStyles } from './useTooltip';
import { t } from 'modules/i18n/utils/intl';
import { calculateTotalRequests, formatNumber } from '../StakeBarChartUtils';
import { StatusCircle } from 'uiKit/StatusCircle';

export interface ITooltipPayload {
  color: string;
  name: string;
  value: number;
}
interface ITooltipProps {
  active?: boolean;
  payload?: ITooltipPayload[];
  label?: string;
}

export const Tooltip = ({ active, payload, label }: ITooltipProps) => {
  const classes = useTooltipStyles();

  if (active && payload?.length && label) {
    const totalRequest = calculateTotalRequests(
      payload.map(item => item.value),
    );

    return (
      <div className={classes.root}>
        <Typography variant="body2" className={classes.label}>
          {label}
        </Typography>
        <div className={classes.totalRow}>
          <Typography variant="body2" className={classes.total}>
            {t('chain-item.method-calls.total')}
          </Typography>
          <Typography variant="body2" className={classes.text}>
            {formatNumber(totalRequest)}
          </Typography>
        </div>
        {payload.map(item => (
          <div className={classes.row} key={item.name}>
            <Typography
              component="div"
              variant="body2"
              className={classes.name}
            >
              <StatusCircle color={item.color} mr={0.75} />
              {item.name}
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {formatNumber(item.value)}
            </Typography>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
