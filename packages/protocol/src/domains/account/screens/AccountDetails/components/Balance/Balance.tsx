import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { Balance as BalanceString } from 'domains/account/components/Balance';
import { BalanceData } from './types';
import { CurrencySwitcher } from 'domains/account/components/CurrencySwitcher';
import { Details } from './Details';
import { i18nKeyRoot } from './BalanceUtils';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './BalanceStyles';

const HAS_WITHDRAW_LINK = false;
const title = t(`${i18nKeyRoot}.title`);

export type BalanceProps = Omit<BalanceData, 'isLoading'>;

export const Balance = ({
  accountType,
  balance,
  onCurrencySwitch,
  premiumUntil,
  status,
  usdBalance,
}: BalanceProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <span className={classes.title}>{title}</span>
          <CurrencySwitcher onSwitch={onCurrencySwitch} />
        </div>
        {HAS_WITHDRAW_LINK && (
          <Button
            className={classes.withdrawButton}
            component={Link}
            to={AccountRoutesConfig.withdraw.path}
            variant="text"
          >
            {t(`${i18nKeyRoot}.withdrawButton.title`)}
          </Button>
        )}
      </div>
      <BalanceString balance={balance} className={classes.balance} />
      <Details
        accountType={accountType}
        premiumUntil={premiumUntil}
        status={status}
        usdBalance={usdBalance}
      />
    </>
  );
};
