import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CryptoPaymentSuccessDialog } from 'modules/billing/components/CryptoPaymentSuccessDialog';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { TConnectAccountSuccessHandler } from 'modules/billing/hooks/useConnectAccountHandler';
import { swapTransaction } from 'domains/account/store/accountTopUpSlice';
import { usePaymentForm } from 'modules/billing/components/PaymentForm/hooks/usePaymentForm';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { AccountManager } from './components/AccountManager';
import { ExpenseChart } from './components/ExpenseChart';
import { PaymentsHistoryTable } from './components/PaymentsHistoryTable';
import { useAccountDetails } from './hooks/useAccountDetails';
import { useOngoingCryptoPayment } from './hooks/useOngoingCryptoPayment';
import { OngoingPayments } from './components/OngoingPayments';
import { useStyles } from './useBillingPageStyles';

export const BillingPage = () => {
  const { hasExpenseChart, loading } = useAccountDetails();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  const {
    cryptoPaymentSuccessDialogProps,
    isLoading,
    isOpened,
    onClose,
    onOpen,
  } = useOngoingCryptoPayment();

  const { classes } = useStyles();

  const dispatch = useDispatch();

  const onConnectAnotherAddressSuccess =
    useCallback<TConnectAccountSuccessHandler>(
      (from, to) => {
        dispatch(swapTransaction({ from, to }));
      },
      [dispatch],
    );

  const paymentFormProps = usePaymentForm({
    onDepositSuccess: onOpen,
    onConnectAnotherAddressSuccess,
  });

  if (loading) {
    return <OverlaySpinner />;
  }

  return (
    <Box className={classes.root}>
      <ExpiredTokenBanner />

      <AccountManager {...paymentFormProps} />

      <OngoingPayments
        className={classes.ongoingPayments}
        onOpenPaymentDialog={
          paymentFormProps.cryptoPaymentDepositDialogProps?.onOpen
        }
      />

      <Box className={classes.payments}>
        <PaymentsHistoryTable />
      </Box>

      {hasExpenseChart && (
        <Box className={classes.expenseChart}>
          <ExpenseChart />
        </Box>
      )}

      <CryptoPaymentSuccessDialog
        {...cryptoPaymentSuccessDialogProps}
        open={isOpened}
        onClose={onClose}
        isLoading={isLoading}
      />
    </Box>
  );
};
