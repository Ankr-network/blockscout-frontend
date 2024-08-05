import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { OngoingPayments } from 'modules/payments/components/OngoingPayments';
import { selectHasReferralBonusBanner } from 'modules/referralProgram/store/selectors';
import { selectOngoingCryptoTransactions } from 'modules/payments/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useCheckDeposit } from 'domains/account/hooks/useCheckDeposit';
import { usePaymentForm } from 'modules/payments/components/PaymentForm/hooks/usePaymentForm';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { AccountManager } from './components/AccountManager';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable';
import { ReferralBonusBanner } from './components/ReferralBonusBanner';
import { useAccountDetails } from './hooks/useAccountDetails';
import { useStyles } from './useBillingPageStyles';

export const BillingPage = () => {
  const { hasExpenseChart, loading } = useAccountDetails();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();
  useCheckDeposit();

  const hasReferralBonusBanner = useAppSelector(selectHasReferralBonusBanner);

  const paymentFormProps = usePaymentForm();
  const ongoingCryptoTxs = useAppSelector(selectOngoingCryptoTransactions);
  const hasOngoingPayments = ongoingCryptoTxs.length > 0;

  const { classes } = useStyles();

  if (loading) {
    return <OverlaySpinner />;
  }

  return (
    <Box className={classes.root}>
      {hasReferralBonusBanner && (
        <ReferralBonusBanner className={classes.referralBonusBanner} />
      )}
      <ExpiredTokenBanner />
      <AccountManager {...paymentFormProps} />
      {hasOngoingPayments && (
        <OngoingPayments className={classes.ongoingPayments} />
      )}
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
