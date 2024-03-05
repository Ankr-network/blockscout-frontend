import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import {
  CryptoPaymentDepositDialog,
  useCryptoPaymentDepositDialog,
} from 'modules/billing/components/CryptoPaymentDepositDialog';
import { ECryptoDepositStep, ECurrency, ENetwork } from 'modules/billing/types';

import { AccountManager } from './components/AccountManager';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable';
import { useAccountDetails } from './hooks/useAccountDetails';
import { OngoingPayments } from './components/OngoingPayments';
import { useStyles } from './useBillingPageStyles';

export const BillingPage = () => {
  const { hasExpenseChart, loading } = useAccountDetails();
  const {
    cryptoPaymentDepositDialogProps,
    handleCryptoPaymentDepositDialogOpen,
  } = useCryptoPaymentDepositDialog({
    amount: 1000,
    amountUSD: 323423,
    currency: ECurrency.ANKR,
    network: ENetwork.ETH,
    step: ECryptoDepositStep.Approval,
  });

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  const { classes } = useStyles();

  if (loading) {
    return <OverlaySpinner />;
  }

  return (
    <Box className={classes.root}>
      <ExpiredTokenBanner />
      <AccountManager />
      <OngoingPayments
        className={classes.ongoingPayments}
        onViewDetailsButtonClick={handleCryptoPaymentDepositDialogOpen} // TODO: add handler
        status="pending" // TODO: pass status or execute with hook inside component
      />
      <Box className={classes.payments}>
        <PaymentsHistoryTable />
      </Box>
      {hasExpenseChart && (
        <Box className={classes.expenseChart}>
          <ExpenseChart />
        </Box>
      )}
      <CryptoPaymentDepositDialog {...cryptoPaymentDepositDialogProps} />
    </Box>
  );
};
