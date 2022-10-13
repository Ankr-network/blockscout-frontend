import { Box, ThemeProvider } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
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

const DEFAULT_TOPUP_VALUES = {
  initialValues: { amount: '' },
  hasRateBlock: true,
};

export const AccountDetails = () => {
  const classes = useStyles();
  const { isNew, premiumUntil, isConnecting } = useAuth();
  const isPremium = !!premiumUntil;
  const { isCardPaymentEligible } = useCardPayment();
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
          <Box className={classes.top}>
            <Balance />
            <TopUpFormContext.Provider value={DEFAULT_TOPUP_VALUES}>
              <TopUp className={classes.topUp} />
            </TopUpFormContext.Provider>
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
