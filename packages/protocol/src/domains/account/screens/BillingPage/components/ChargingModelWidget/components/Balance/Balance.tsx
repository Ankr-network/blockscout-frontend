import { Typography } from '@mui/material';

import { BalanceTooltip } from 'domains/account/components/BalanceTooltip';
import { renderCreditBalance } from 'modules/billing/utils/renderCreditBalance';
import { renderRequestsBalance } from 'modules/billing/utils/renderRequestsBalance';
import { renderUsdBalance } from 'modules/billing/utils/renderUsdBalance';

import { useBalanceStyles } from './BalanceStyles';

export interface BalanceProps {
  balanceInRequests: number;
  className?: string;
  creditBalance?: number;
  hasUsdBalance?: boolean;
  isRequestsBalanceApproximate?: boolean;
  shouldUseRequests: boolean;
  usdBalance: number;
}

export const Balance = ({
  balanceInRequests: requestsBalance,
  className,
  creditBalance = 0,
  hasUsdBalance = true,
  isRequestsBalanceApproximate = true,
  shouldUseRequests,
  usdBalance,
}: BalanceProps) => {
  const { classes, cx } = useBalanceStyles();

  const [balance, balanceString] = shouldUseRequests
    ? [requestsBalance, renderRequestsBalance({ requestsBalance })]
    : [creditBalance, renderCreditBalance({ creditBalance })];

  return (
    <BalanceTooltip balance={balance}>
      <div className={cx(classes.root, className)}>
        <Typography className={classes.creditBalance} variant="h6">
          {balanceString}
        </Typography>
        {hasUsdBalance && (
          <Typography className={classes.usdBalance} variant="body2">
            {renderUsdBalance({ isApproximate: true, usdBalance })}
          </Typography>
        )}
        {Boolean(creditBalance) && (
          <Typography className={classes.usdBalance} variant="body2">
            {renderRequestsBalance({
              isApproximate: isRequestsBalanceApproximate,
              isShortened: true,
              prefix: hasUsdBalance ? ' / ' : undefined,
              requestsBalance,
            })}
          </Typography>
        )}
      </div>
    </BalanceTooltip>
  );
};
