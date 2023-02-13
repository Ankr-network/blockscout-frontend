import { Box } from '@mui/material';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { AccountDetailsTopUp } from './components/AccountDetailsTopUp';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { Balance } from './components/Balance';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable/PaymentsHistoryTable';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useStyles } from './AccountDetailsStyles';
import { Subscriptions } from './components/Subscriptions';

export const AccountDetails = () => {
  const { classes } = useStyles();
  const { premiumUntil, isConnecting } = useAccountAuth();
  const isPremium = !!premiumUntil;

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
          {!isPremium && (
            <Box className={classes.expenseChart}>
              <ExpenseChart />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
