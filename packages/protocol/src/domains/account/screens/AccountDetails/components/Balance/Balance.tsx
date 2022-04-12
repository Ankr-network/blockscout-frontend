import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { EnoughTimePeriod } from './types';
import { Preloader } from 'uiKit/Preloader';
import { formatNumber } from './utils/formatNumber';
import { t } from 'modules/i18n/utils/intl';
import { useBalanceData } from './hooks/useBalanceData';

import { useStyles } from './BalanceStyles';

const i18nKeyRoot = 'account.accountDetails.balance';

const periodsMap: Record<EnoughTimePeriod, string> = {
  [EnoughTimePeriod.Day]: t(`${i18nKeyRoot}.description.periods.day`),
  [EnoughTimePeriod.Month]: t(`${i18nKeyRoot}.description.periods.month`),
  [EnoughTimePeriod.Year]: t(`${i18nKeyRoot}.description.periods.year`),
};

export const Balance = () => {
  const { ankrBalance, enoughMarker, enoughTime, isLoading, usdtBalance } =
    useBalanceData();

  const classes = useStyles(enoughMarker);
  const description = t(`${i18nKeyRoot}.description.text`, {
    quantifier: t(`${i18nKeyRoot}.description.quantifiers.approximately`),
    value: enoughTime.value,
    period: periodsMap[enoughTime.period],
    plural:
      enoughTime.value > 1
        ? t(`${i18nKeyRoot}.description.periods.plural`)
        : '',
  });

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
        <div className={classes.marker} />
        <span className={classes.usdtBalance}>
          ~${formatNumber(usdtBalance)}
        </span>
        <span className={classes.description}>{description}</span>
      </div>
    </>
  );

  return (
    <Box className={classes.balanceRoot}>
      {isLoading ? <Preloader /> : content}
    </Box>
  );
};
