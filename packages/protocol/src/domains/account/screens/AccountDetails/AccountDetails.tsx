import React from 'react';
import { ThemeProvider, Box } from '@material-ui/core';

import { mainTheme } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useStyles } from './AccountDetailsStyles';
import { Balance } from './components/Balance';

export const AccountDetails = () => {
  const classes = useStyles();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Box className={classes.root}>
        <Box className={classes.top}>
          <Balance />
          <Box className={classes.topUp}>Top Up</Box>
        </Box>
        <Box className={classes.payments}>Payments</Box>
        <Box className={classes.chart}>Chart</Box>
      </Box>
    </ThemeProvider>
  );
};
