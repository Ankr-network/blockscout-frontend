import { Balance as BalanceString } from 'domains/account/components/Balance';
import { t } from '@ankr.com/common';

import { SWITCH_CURRENCY_DISABLED } from '../ExpenseChart/const';
import { useStyles } from './BalanceStyles';
import { CurrencySwitcher } from './components/CurrencySwitcher';
import { Details } from './components/Details';
import { root } from './const';
import { BalanceData } from './types';

const title = t(`${root}.title`);

export type BalanceProps = Omit<BalanceData, 'isLoading'>;

export const Balance = ({
  accountType,
  balance,
  currency,
  premiumUntil,
  status,
  switchCurrency,
  usdBalance,
  creditBalance,
}: BalanceProps) => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <span className={classes.title}>{title}</span>
          {!SWITCH_CURRENCY_DISABLED && (
            <CurrencySwitcher currency={currency} onClick={switchCurrency} />
          )}
        </div>
      </div>
      <BalanceString balance={balance} className={classes.balance} />
      <Details
        accountType={accountType}
        premiumUntil={premiumUntil}
        status={status}
        usdBalance={usdBalance}
        creditBalance={creditBalance}
      />
    </>
  );
};
