import { Typography } from '@mui/material';

import { renderCreditBalance } from 'modules/billing/utils/renderCreditBalance';
import { renderRequestsBalance } from 'modules/billing/utils/renderRequestsBalance';
import { renderUsdBalance } from 'modules/billing/utils/renderUsdBalance';

import { useBalanceRowStyles } from './useBalanceRowStyles';

export interface IBalanceRowProps {
  className?: string;
  creditBalance: number;
  requestsBalance: number;
  title: string;
  usdBalance?: number;
}

export const BalanceRow = ({
  className,
  creditBalance,
  requestsBalance,
  title,
  usdBalance,
}: IBalanceRowProps) => {
  const hasUsdBalance = typeof usdBalance === 'number';

  const { classes, cx } = useBalanceRowStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography className={classes.title} variant="subtitle3">
        {title}
      </Typography>
      <div className={classes.balance}>
        <Typography variant="subtitle2">
          {renderCreditBalance({ creditBalance })}
        </Typography>
        <Typography className={classes.requests} variant="body3">
          {renderRequestsBalance({
            isShortened: true,
            requestsBalance,
            prefix: hasUsdBalance
              ? `${renderUsdBalance({ hasZeroDecimals: false, usdBalance })} / `
              : undefined,
          })}
        </Typography>
      </div>
    </div>
  );
};
