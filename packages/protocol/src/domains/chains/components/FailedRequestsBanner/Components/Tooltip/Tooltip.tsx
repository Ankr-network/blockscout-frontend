import { tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { ITooltipProps } from '../../../RequestsChart';
import { useTooltipStyles } from '../../../RequestsBannerContainer/components/Tooltip/useTooltipStyles';

export const intlFailedRequestsBannerRoot = 'failed-requests-banner';

export const Tooltip = ({ active, label, payload }: ITooltipProps) => {
  const { classes } = useTooltipStyles();

  if (!(active && payload?.length && label)) return null;

  const { name, rejectedRequestsCount, total } = payload[0]?.payload || {};

  return (
    <div className={classes.root}>
      <div className={classes.total}>
        {tHTML(`${intlFailedRequestsBannerRoot}.total`, { total })}
      </div>
      <div className={classes.reject}>
        {tHTML(`${intlFailedRequestsBannerRoot}.rejected`, {
          rejected: new BigNumber(rejectedRequestsCount).isZero()
            ? 0
            : -rejectedRequestsCount,
        })}
      </div>
      <div className={classes.name}>{name}</div>
    </div>
  );
};
