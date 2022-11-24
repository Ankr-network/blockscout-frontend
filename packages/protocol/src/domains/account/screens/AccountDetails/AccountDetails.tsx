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
import { TopUp } from './components/TopUp';
import { USDBanner } from './components/USDBanner';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { TopUpFormContext } from './components/TopUp/TopUpForm/TopUpFormUtils';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { validateAmount } from './AccountDetailsUtils';
import { MIN_ANKR_AMOUNT } from 'domains/pricing/screens/Pricing/components/PremiumBlock/PricingTopUp/PricingTopUpUtils';

export const AccountDetails = () => {
  const classes = useStyles();
  const {
    isNew,
    premiumUntil,
    isConnecting,
    credentials,
    workerTokenData,
    hasOauthLogin,
  } = useAccountAuth();
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

  const hasExpiredToken =
    credentials && !workerTokenData?.userEndpointToken && !hasOauthLogin;

  return (
    <ThemeProvider theme={mainTheme}>
      {isConnecting ? (
        <Spinner />
      ) : (
        <Box className={classes.root}>
          <ExpiredTokenBanner />

          <Box className={classes.top}>
            <Balance />
            <TopUpFormContext.Provider
              value={{
                initialValues: {
                  amount: hasExpiredToken ? MIN_ANKR_AMOUNT.toString(10) : '',
                },
                isAccountPage: true,
                validateAmount: hasExpiredToken ? validateAmount : undefined,
              }}
            >
              <TopUp className={classes.topUp} />
            </TopUpFormContext.Provider>
          </Box>
          {isNew && <USDBanner />}
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
