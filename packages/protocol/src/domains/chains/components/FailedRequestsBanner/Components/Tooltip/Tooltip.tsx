import { tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useTooltipStyles } from './useTooltipStyles';

export const intlFailedRequestsBannerRoot = 'failed-requests-banner';

export interface IErrorItemPaylod {
  name: string;
  total: number;
  rejectedRequestsCount: number;
}

export interface ITooltipPayload {
  color: string;
  name: string;
  value: number;
  payload: IErrorItemPaylod;
}

interface ITooltipProps {
  active?: boolean;
  payload?: ITooltipPayload[];
  label?: string;
}

export const Tooltip = ({ active, payload, label }: ITooltipProps) => {
  const { classes } = useTooltipStyles();

  if (!(active && payload?.length && label)) return null;

  const { total, rejectedRequestsCount, name } = payload[0]?.payload;

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
