import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { StatusCircle } from 'uiKit/StatusCircle';

import { calculateTotalRequests, formatNumber } from '../StakeBarChartUtils';
import { useTooltipStyles } from './useTooltip';
import {
  COMMON_POPUP_WIDTH,
  DYNAMIC_POPUP_BASIC_WIDTH,
  getName,
} from './TooltipUtils';

interface ITooltipPayloadProps {
  name: string;
  tooltipTitle: string;
}

interface ITooltipPayload {
  color: string;
  name: string;
  value: number;
  payload: ITooltipPayloadProps;
}

interface ITooltipProps {
  active?: boolean;
  payload?: ITooltipPayload[];
  label?: string;
}

export const Tooltip = ({ active, label, payload }: ITooltipProps) => {
  const maxMethodWidth = useMemo(
    () =>
      payload
        ? Math.max(...payload.map(item => item.name.length)) +
          DYNAMIC_POPUP_BASIC_WIDTH
        : COMMON_POPUP_WIDTH,
    [payload],
  );
  const { classes } = useTooltipStyles(maxMethodWidth);

  if (!(active && payload?.length && label)) return null;

  const totalRequest = calculateTotalRequests(payload.map(item => item.value));

  return (
    <div className={classes.root}>
      <Typography component="p" variant="body2" className={classes.label}>
        {payload[0]?.payload?.tooltipTitle}
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
              {getName(item.name)}
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {formatNumber(item.value)}
            </Typography>
          </div>
        ))}
    </div>
  );
};
