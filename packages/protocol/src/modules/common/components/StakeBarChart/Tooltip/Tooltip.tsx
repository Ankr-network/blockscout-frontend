import React, { useMemo } from 'react';
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

const COMMON_POPUP_WIDTH = 320;
const DYNAMIC_POPUP_BASIC_WIDTH = 360;
const MAX_METHOD_NUMBER_LENGTH = 40;

export const Tooltip = ({ active, payload, label }: ITooltipProps) => {
  const maxMethodWidth = useMemo(
    () =>
      payload
        ? Math.max(...payload.map(item => item.name.length)) +
          DYNAMIC_POPUP_BASIC_WIDTH
        : COMMON_POPUP_WIDTH,
    [payload],
  );
  const classes = useTooltipStyles({ maxMethodWidth });

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
        {payload &&
          payload.reverse().map(item => (
            <div className={classes.row} key={item.name}>
              <Typography
                component="div"
                variant="body2"
                className={classes.name}
              >
                <StatusCircle color={item.color} mr={0.75} />
                {item.name.includes(
                  t('chain-item.method-calls.other-methods-text'),
                )
                  ? t('chain-item.method-calls.other-methods')
                  : item.name.length > MAX_METHOD_NUMBER_LENGTH
                  ? `${item.name.substring(0, MAX_METHOD_NUMBER_LENGTH)}...`
                  : item.name}
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
