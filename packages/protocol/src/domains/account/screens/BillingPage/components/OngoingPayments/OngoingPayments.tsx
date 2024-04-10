import { Ankr } from '@ankr.com/ui';
import { Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { DetailsButton } from '../PaymentsHistoryTable/components/DetailsButton';
import { OngoingPaymentStatus } from '../OngoingPaymentStatus';
import { useOngoingPayments } from './useOngoingPayments';
import { useOngoingPaymentsStyles } from './useOngoingPaymentsStyles';

interface IOngoingPaymentsProps {
  className?: string;
  onOpenPaymentDialog?: () => void;
}

export const OngoingPayments = ({
  className,
  onOpenPaymentDialog,
}: IOngoingPaymentsProps) => {
  const { cx, classes } = useOngoingPaymentsStyles();

  const {
    txHash,
    approvedAmountString,
    approvedUsdAmount,
    transactionStatus,
    isLoading,
    shouldShowOngoingPayment,
    isSuccessState,
  } = useOngoingPayments();

  if (!shouldShowOngoingPayment || isLoading) {
    return null;
  }

  return (
    <section className={cx(classes.ongoingPaymentRoot, className)}>
      <Typography variant="h6" className={classes.ongoingPaymentTitle}>
        {t('account.account-details.ongoing-payments.title')}
      </Typography>
      <Paper className={classes.ongoingPaymentPaper}>
        <Typography variant="body2">
          {t('account.account-details.ongoing-payments.one-time-payment')}
        </Typography>

        {approvedAmountString && (
          <Typography variant="body3" className={classes.paymentValue}>
            <Ankr className={classes.iconAnkr} /> {approvedAmountString} ANKR{' '}
            <Typography variant="body3" color="textSecondary">
              / ≈${approvedUsdAmount}
            </Typography>
          </Typography>
        )}

        <OngoingPaymentStatus status={transactionStatus} />

        {isSuccessState && approvedAmountString && txHash ? (
          <DetailsButton amount={approvedAmountString} txHash={txHash} />
        ) : (
          <Button
            variant="outlined"
            size="extraSmall"
            onClick={onOpenPaymentDialog}
          >
            {t('account.payment-table.details')}
          </Button>
        )}
      </Paper>
    </section>
  );
};
