import React from 'react';
import { ThemeProvider, Box } from '@material-ui/core';

import { mainTheme } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { TopUp } from './components/TopUp';
import { Balance } from './components/Balance';
import { useStyles } from './AccountDetailsStyles';

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
          <PaymentsHistoryTable />
        </Box>
        <Box className={classes.expenseChart}>
          <ExpenseChart />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
