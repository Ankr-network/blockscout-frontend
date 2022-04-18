import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { Preloader } from 'uiKit/Preloader';
import { formatNumber, i18nKeyRoot } from './BalanceUtils';
import { t } from 'modules/i18n/utils/intl';
import { useBalanceData } from './hooks/useBalanceData';

import { useStyles } from './BalanceStyles';
import { Details } from './Details';

export const Balance = () => {
  const {
    ankrBalance,
    enoughTime,
    isLoading,
    serviceType,
    status,
    premiumUntil,
    usdBalance,
  } = useBalanceData();

  const classes = useStyles();

  const content = (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <span className={classes.title}>{t(`${i18nKeyRoot}.title`)}</span>
          <div className={classes.currency}>ANKR</div>
        </div>
        <Button
          className={classes.withdrawButton}
          component={Link}
          to={AccountRoutesConfig.withdraw.path}
          variant="text"
        >
          {t(`${i18nKeyRoot}.withdrawButton.title`)}
        </Button>
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

  return (
    <Box className={classes.balanceRoot}>
      {isLoading ? <Preloader /> : content}
    </Box>
  );
};
