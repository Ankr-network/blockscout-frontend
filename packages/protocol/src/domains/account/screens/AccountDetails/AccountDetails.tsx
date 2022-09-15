import { Box, ThemeProvider } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';

import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { UpcomingUpdateBanner } from 'modules/common/components/UpcomingUpdateBanner';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { mainTheme, Spinner } from 'ui';
import { useStyles } from './AccountDetailsStyles';
import { Balance } from './components/Balance';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { TopUp } from './components/TopUp';
import { USDBanner } from './components/USDBanner';

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
          <UpcomingUpdateBanner />

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
