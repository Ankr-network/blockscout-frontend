import React from 'react';
import { ThemeProvider, Box } from '@material-ui/core';

import { mainTheme } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useStyles } from './AccountDetailsStyles';
import { PaymentsHistoryTableWrapped } from './components/PaymentsHistoryTable/PaymentsHistoryTableWrapped';
import { TopUp } from './components/TopUp';
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
          <TopUp className={classes.topUp} />
        </Box>
        <Box className={classes.payments}>
          <PaymentsHistoryTableWrapped />
        </Box>
        <Box className={classes.chart}>Chart</Box>
      </Box>
    </ThemeProvider>
  );
};
