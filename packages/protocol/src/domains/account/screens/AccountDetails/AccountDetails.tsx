import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useState } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { useStyles } from './AccountDetailsStyles';
import { Subscriptions } from './components/Subscriptions';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable';
import { ExpenseChart } from './components/ExpenseChart';
import { Balance } from './components/Balance';
import { AccountDetailsTopUp } from './components/AccountDetailsTopUp';

export const AccountDetails = () => {
  const [hasSubscriptions, setHasSubscriptions] = useState(false);

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

  const { classes } = useStyles(hasSubscriptions);

  return (
    <>
      {isConnecting ? (
        <OverlaySpinner />
      ) : (
        <Box className={classes.root}>
          <ExpiredTokenBanner />
          <Box className={classes.top}>
            <Balance className={classes.balance} />
            <Subscriptions
              className={classes.subscriptions}
              setHasSubscriptions={setHasSubscriptions}
            />
            <GuardUserGroup blockName={BlockWithPermission.Billing}>
              <AccountDetailsTopUp className={classes.topUp} />
            </GuardUserGroup>
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
