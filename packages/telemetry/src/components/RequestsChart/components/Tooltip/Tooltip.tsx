import { Typography } from '@mui/material';

import { formatNumber } from './utils/formatNumber';
import { useTooltipStyles } from './TooltipStyles';
import { IChartData } from '../../../Chart';
import { TranslationDateFn } from '../../../../types';

export interface TooltipProps {
  active?: boolean;
  translation: {
    time: TranslationDateFn;
    date: TranslationDateFn;
  };
  payload?: Array<{
    value: number;
    payload: IChartData;
  }>;
}

export const Tooltip = ({
  active,
  payload,
  translation: { time, date },
}: TooltipProps) => {
  const { classes } = useTooltipStyles();

  const shouldHide = !(active && payload && payload.length > 0);

  if (shouldHide) return null;

  const item = payload[0].payload;

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="body2" className={classes.value}>
          {formatNumber(item.value || item.extraValue || 0)}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography variant="body1" className={classes.time}>
          {`${date(item.time)} ${time(item.time)}`}
        </Typography>
      </div>
    </div>
  );
};
