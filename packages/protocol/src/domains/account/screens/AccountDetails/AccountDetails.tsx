import React from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';

import { mainTheme, Spinner } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { TopUp } from './components/TopUp';
import { Balance } from './components/Balance';
import { useStyles } from './AccountDetailsStyles';
import { useAuth } from 'domains/account/hooks/useAuth';
import { USDBanner } from './components/USDBanner';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { Balance as AccountBalance } from 'domains/account/actions/balance/types';

export const AccountDetails = () => {
  const classes = useStyles();
  const { isNew, premiumUntil, isConnecting } = useAuth();
  const isPremium = !!premiumUntil;
  const { isCardPaymentEligible } = useCardPayment();

  const { data: balances } = useQuery<AccountBalance>({
    type: fetchBalance.toString(),
  });

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  return (
    <ThemeProvider theme={mainTheme}>
      {isConnecting ? (
        <Spinner />
      ) : (
        <Box className={classes.root}>
          <Box className={classes.top}>
            <Balance />
            <TopUp className={classes.topUp} />
          </Box>
          {isCardPaymentEligible && isNew && <USDBanner />}
          {!isNew && (
            <>
              <Box className={classes.payments}>
                <PaymentsHistoryTable balances={balances} />
              </Box>
              {!isPremium && (
                <Box className={classes.expenseChart}>
                  <ExpenseChart />
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </ThemeProvider>
  );
};
