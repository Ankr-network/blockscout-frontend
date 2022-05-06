import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BalanceData } from './types';
import { Details } from './Details';
import { formatNumber, i18nKeyRoot } from './BalanceUtils';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './BalanceStyles';

const HAS_WITHDRAW_LINK = false;

export type BalanceProps = Omit<BalanceData, 'isLoading'>;

export const Balance = ({
  ankrBalance,
  enoughTime,
  serviceType,
  status,
  premiumUntil,
  usdBalance,
}: BalanceProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <span className={classes.title}>{t(`${i18nKeyRoot}.title`)}</span>
          <div className={classes.currency}>ANKR</div>
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
      <div className={classes.balance}>{formatNumber(ankrBalance)}</div>
      <Details
        enoughTime={enoughTime}
        premiumUntil={premiumUntil}
        serviceType={serviceType}
        status={status}
        usdBalance={usdBalance}
      />
    </>
  );
};
