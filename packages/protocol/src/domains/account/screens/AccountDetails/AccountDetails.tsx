import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountDetailsTopUp } from './components/AccountDetailsTopUp';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { Balance } from './components/Balance';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { Subscriptions } from './components/Subscriptions';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useStyles } from './AccountDetailsStyles';

export const AccountDetails = () => {
  const { classes } = useStyles();
  const { isLoggedIn, isOldPremium, loading: isConnecting } = useAuth();

  // We only show the expense chart for registered users
  // but not for old premium users who registered before PAYG model
  const hasExpenseChart = isLoggedIn && !isOldPremium;

  const [, { data: balances }] = useQueryEndpoint(accountFetchBalance);

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  return (
    <>
      {isConnecting ? (
        <OverlaySpinner />
      ) : (
        <Box className={classes.root}>
          <ExpiredTokenBanner />
          <Box className={classes.top}>
            <Box className={classes.top1column}>
              <Balance />
              <Subscriptions />
            </Box>
            <AccountDetailsTopUp className={classes.topUp} />
          </Box>
          <Box className={classes.payments}>
            <PaymentsHistoryTable balances={balances!} />
          </Box>
          {hasExpenseChart && (
            <Box className={classes.expenseChart}>
              <ExpenseChart />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
