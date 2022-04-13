import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AccountMarker } from 'modules/account/components/AccountMarker';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { Preloader } from 'uiKit/Preloader';
import { formatNumber, getDescription, i18nKeyRoot } from './BalanceUtils';
import { t } from 'modules/i18n/utils/intl';
import { useBalanceData } from './hooks/useBalanceData';

import { useStyles } from './BalanceStyles';

export const Balance = () => {
  const { ankrBalance, enoughTime, isLoading, status, usdtBalance } =
    useBalanceData();

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
      <div className={classes.footer}>
        <AccountMarker status={status} />
        <span className={classes.usdtBalance}>
          ~${formatNumber(usdtBalance)}
        </span>
        <span className={classes.description}>
          {getDescription(enoughTime)}
        </span>
      </div>
    </>
  );

  return (
    <Box className={classes.balanceRoot}>
      {isLoading ? <Preloader /> : content}
    </Box>
  );
};
