import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Balance as BalanceString } from 'domains/account/components/Balance';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'modules/i18n/utils/intl';
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
  balanceEndTime,
  currency,
  premiumUntil,
  status,
  switchCurrency,
  usdBalance,
}: BalanceProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <span className={classes.title}>{title}</span>
          {!SWITCH_CURRENCY_DISABLED && (
            <CurrencySwitcher currency={currency} onClick={switchCurrency} />
          )}
        </div>
        <Button
          className={classes.withdrawButton}
          component={Link}
          to={AccountRoutesConfig.withdraw.path}
          variant="text"
        >
          {t(`${root}.withdrawButton.title`)}
        </Button>
      </div>
      <BalanceString balance={balance} className={classes.balance} />
      <Details
        accountType={accountType}
        balanceEndTime={balanceEndTime}
        premiumUntil={premiumUntil}
        status={status}
        usdBalance={usdBalance}
      />
    </>
  );
};
