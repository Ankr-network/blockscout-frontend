import { Typography } from '@mui/material';
import { IChartData } from 'modules/common/components/Chart';
import { formatDate } from './utils/formatDate';
import { formatNumber } from './utils/formatNumber';
import { useTooltipStyles } from './TooltipStyles';

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: IChartData;
  }>;
}

export const Tooltip = ({ active, payload }: TooltipProps) => {
  const { classes } = useTooltipStyles();

  if (!(active && payload && payload.length > 0)) return null;

  const item = payload[0].payload;

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="body2" className={classes.value}>
          {formatNumber((item.value || item.extraValue) ?? 0)}
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
