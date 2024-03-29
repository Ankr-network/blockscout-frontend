import { t } from '@ankr.com/common';
import { Button, Paper, Typography } from '@mui/material';
import { Ankr } from '@ankr.com/ui';
import { Token } from 'multirpc-sdk';

import { DetailsButtonContainer } from '../PaymentsHistoryTable/components/DetailsButton';
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

        {txHash && approvedAmountString && transactionStatus === 'success' ? (
          <DetailsButtonContainer
            amount={approvedAmountString}
            // temporary const, will be changed in Billing page version 2.0
            token={Token.ANKR}
            txHash={txHash}
            date={new Date()}
          />
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
