import { Button, Paper, Typography } from '@mui/material';
import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { CurrencyIcon } from 'modules/common/components/CurrencyIcon';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useTopupInitialStep } from 'domains/account/screens/TopUp/useTopupInitialStep';

import { DetailsButton } from '../PaymentsHistoryTable/components/DetailsButton';
import { OngoingPaymentStatus } from '../OngoingPaymentStatus';
import { useOngoingPayments } from './hooks/useOngoingPayments';
import { useOngoingPaymentsStyles } from './useOngoingPaymentsStyles';

interface IOngoingPaymentsProps {
  className?: string;
  handleOpenDepositDialog: () => void;
}

export const OngoingPayments = ({
  className,
  handleOpenDepositDialog,
}: IOngoingPaymentsProps) => {
  const { cx, classes } = useOngoingPaymentsStyles();

  const {
    amountString,
    approvedUsdAmount,
    currency,
    isSuccessState,
    network,
    ongoingPaymentStatus,
    shouldShowOngoingPayment,
    txHash,
  } = useOngoingPayments();

  const { isLoading } = useTopupInitialStep();

  const { handleResetDeposit, handleResetTopUpTransaction } = useTopUp();

  const onSuccessDialogClose = useCallback(() => {
    handleResetTopUpTransaction();
    handleResetDeposit();
  }, [handleResetDeposit, handleResetTopUpTransaction]);

  const shouldRenderOngoingPayments = shouldShowOngoingPayment && !isLoading;

  if (!shouldRenderOngoingPayments) {
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

        {amountString && (
          <Typography variant="body3" className={classes.paymentValue}>
            <CurrencyIcon
              currency={currency}
              network={network}
              rootClassName={classes.currencyIcon}
              currencyClassName={classes.currencyIcon}
              networkClassName={classes.networkIcon}
            />
            {amountString} {currency}{' '}
            <Typography variant="body3" color="textSecondary">
              / ≈${approvedUsdAmount}
            </Typography>
          </Typography>
        )}

        <OngoingPaymentStatus status={ongoingPaymentStatus} />

        {isSuccessState && amountString && txHash ? (
          <DetailsButton
            amount={amountString}
            currency={currency}
            network={network ?? EBlockchain.eth}
            onDialogClose={onSuccessDialogClose}
            txHash={txHash}
          />
        ) : (
          <Button
            variant="outlined"
            size="extraSmall"
            onClick={handleOpenDepositDialog}
          >
            {t('account.payment-table.details')}
          </Button>
        )}
      </Paper>
    </section>
  );
};
