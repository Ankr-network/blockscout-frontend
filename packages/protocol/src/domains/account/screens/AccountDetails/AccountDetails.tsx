import { Box, ThemeProvider } from '@material-ui/core';
import { Spinner, mainTheme } from 'ui';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { AccountDetailsTopUp } from './components/AccountDetailsTopUp';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { Balance } from './components/Balance';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { USDBanner } from './components/USDBanner';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { t } from 'modules/i18n/utils/intl';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useStyles } from './AccountDetailsStyles';

export const AccountDetails = () => {
  const classes = useStyles();
  const { isNew, premiumUntil, isConnecting } = useAccountAuth();
  const isPremium = !!premiumUntil;
  const history = useHistory();

  const [, { data: balances }] = useQueryEndpoint(accountFetchBalance);

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
                <PaymentsHistoryTable balances={balances!} />
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
