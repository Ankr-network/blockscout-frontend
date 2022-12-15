import { Box, ThemeProvider } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { mainTheme, Spinner } from 'ui';
import { useStyles } from './AccountDetailsStyles';
import { Balance } from './components/Balance';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { USDBanner } from './components/USDBanner';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { AccountDetailsTopUp } from './components/AccountDetailsTopUp';

export const AccountDetails = () => {
  const classes = useStyles();
  const { isNew, premiumUntil, isConnecting } = useAccountAuth();
  const isPremium = !!premiumUntil;
  const history = useHistory();

  const { data: balances } = useQuery<AccountBalance>({
    type: fetchBalance.toString(),
  });

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  useEffect(() => {
    if (!isConnecting && isNew) {
      history.push(PricingRoutesConfig.pricing.generatePath());
    }
  }, [isConnecting, isNew, history]);

  return (
    <ThemeProvider theme={mainTheme}>
      {isConnecting ? (
        <Spinner />
      ) : (
        <Box className={classes.root}>
          <ExpiredTokenBanner />

          <Box className={classes.top}>
            <Balance />
            <AccountDetailsTopUp />
          </Box>
          {isNew ? (
            <USDBanner />
          ) : (
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
