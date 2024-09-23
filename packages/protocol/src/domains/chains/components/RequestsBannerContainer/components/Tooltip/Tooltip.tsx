import { tHTML } from '@ankr.com/common';

import { useTooltipStyles } from './useTooltipStyles';
import { ITooltipProps } from '../../../RequestsChart';

export const Tooltip = ({ active, label, payload }: ITooltipProps) => {
  const { classes } = useTooltipStyles();

  if (!(active && payload?.length && label)) return null;

  const { name, successRequestsCount } = payload[0]?.payload || {};

  return (
    <div className={classes.root}>
      <div className={classes.total}>
        {tHTML(`requests-banner.successRequestsCount`, {
          successRequestsCount,
        })}
      </div>
      <div className={classes.name}>{name}</div>
    </div>
  );
};
