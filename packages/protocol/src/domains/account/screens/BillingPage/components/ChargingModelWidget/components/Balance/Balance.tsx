import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { BalanceTooltip } from 'domains/account/components/BalanceTooltip';

import { intlRoot } from '../../const';
import { useBalanceStyles } from './BalanceStyles';

export interface BalanceProps {
  balanceInRequests: number;
  className?: string;
  creditBalance?: number;
  shouldUseRequests: boolean;
  usdBalance: number;
}

const creditIntlKey = `${intlRoot}.credit-balance`;
const requestsIntlKey = `${intlRoot}.requests-balance`;
const usdIntlKey = `${intlRoot}.usd-balance`;
const reqIntlKey = `${intlRoot}.req-balance`;

export const Balance = ({
  balanceInRequests,
  className,
  creditBalance,
  shouldUseRequests,
  usdBalance,
}: BalanceProps) => {
  const { classes, cx } = useBalanceStyles();

  const [balance, balanceKey] = shouldUseRequests
    ? [balanceInRequests, requestsIntlKey]
    : [creditBalance || 0, creditIntlKey];

  return (
    <BalanceTooltip balance={balance}>
      <div className={cx(classes.root, className)}>
        <Typography className={classes.creditBalance} variant="h6">
          {t(balanceKey, { balance })}
        </Typography>
        <Typography className={classes.usdBalance} variant="body2">
          {t(usdIntlKey, { balance: usdBalance })}
        </Typography>
        {Boolean(creditBalance) && (
          <Typography className={classes.usdBalance} variant="body2">
            {t(reqIntlKey, { balance: balanceInRequests })}
          </Typography>
        )}
      </div>
    </BalanceTooltip>
  );
};
