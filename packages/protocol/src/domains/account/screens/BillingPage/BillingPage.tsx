import { useCallback } from 'react';
import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { AccountManager } from './components/AccountManager';
import { ExpenseChart } from './components/ExpenseChart';
import { OngoingPayments } from './components/OngoingPayments';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable';
import { useAccountDetails } from './hooks/useAccountDetails';
import { usePaymentForm } from './hooks/usePaymentForm';
import { useStyles } from './useBillingPageStyles';

export const BillingPage = () => {
  const { hasExpenseChart, loading } = useAccountDetails();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  const { paymentFormProps } = usePaymentForm();

  const { classes } = useStyles();

  const handleOpenDepositDialog = useCallback(
    (network: EBlockchain) => {
      paymentFormProps.cryptoPaymentSummaryProps?.handleNetworkChange(network);
      paymentFormProps.cryptoPaymentDepositDialogProps.onOpen();
    },
    [paymentFormProps],
  );

  if (loading) {
    return <OverlaySpinner />;
  }

  return (
    <Box className={classes.root}>
      <ExpiredTokenBanner />

      <AccountManager {...paymentFormProps} />

      <OngoingPayments
        className={classes.ongoingPayments}
        handleOpenDepositDialog={handleOpenDepositDialog}
      />

      <Box className={classes.payments}>
        <PaymentsHistoryTable />
      </Box>

      {hasExpenseChart && (
        <Box className={classes.expenseChart}>
          <ExpenseChart />
        </Box>
      )}
    </Box>
  );
};
