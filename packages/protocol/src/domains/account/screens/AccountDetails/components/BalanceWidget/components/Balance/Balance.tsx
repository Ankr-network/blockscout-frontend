import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { AccountMarker } from 'domains/account/components/AccountMarker';
import { AccountStatus } from 'domains/account/types';
import { BalanceTooltip } from 'domains/account/components/BalanceTooltip';

import { intlRoot } from '../../const';
import { useBalanceStyles } from './BalanceStyles';

export interface BalanceProps {
  className?: string;
  creditBalance: string;
  status: AccountStatus;
  usdBalance: string;
}

const creditIntlKey = `${intlRoot}.credit-balance`;
const usdIntlKey = `${intlRoot}.usd-balance`;

export const Balance = ({
  className,
  creditBalance,
  status,
  usdBalance,
}: BalanceProps) => {
  const { classes, cx } = useBalanceStyles();

  return (
    <BalanceTooltip balance={creditBalance}>
      <div className={cx(classes.root, className)}>
        <AccountMarker className={classes.marker} status={status} />
        <Typography className={classes.creditBalance} variant="h4">
          {t(creditIntlKey, { balance: creditBalance })}
        </Typography>
        <Typography className={classes.usdBalance} variant="body2">
          {t(usdIntlKey, { balance: usdBalance })}
        </Typography>
      </div>
    </BalanceTooltip>
  );
};
