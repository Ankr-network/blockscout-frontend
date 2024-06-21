import { Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ICryptoTransaction } from 'modules/payments/types';

import { Amount } from './components/Amount';
import { CryptoPaymentDepositDialog } from '../CryptoPaymentDepositDialog';
import { CryptoPaymentSuccessDialog } from '../CryptoPaymentSuccessDialog';
import { CryptoPaymentSummaryDialog } from '../CryptoPaymentSummaryDialog';
import { DetailsButton } from './components/DetailsButton';
import { StatusBadge } from './components/StatusBadge';
import { useOngoingPayment } from './hooks/useOngoingPayment';
import { useOngoingPaymentStyles } from './useOngoingPaymentStyles';

export interface IOngoingPaymentProps {
  tx: ICryptoTransaction;
}

export const OngoingPayment = ({ tx }: IOngoingPaymentProps) => {
  const {
    amount,
    amountUsd,
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    currency,
    handleDetailsButtonClick,
    isConfirming,
    isErrored,
    isSuccessful,
    network,
  } = useOngoingPayment({ tx });

  const { classes } = useOngoingPaymentStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="body2">
        {t('account.account-details.ongoing-payments.one-time-payment')}
      </Typography>
      <Amount
        amount={amount}
        amountUsd={amountUsd}
        currency={currency}
        network={network}
      />
      <StatusBadge
        isErrored={isErrored}
        isSuccessful={isSuccessful}
        isConfirming={isConfirming}
      />
      <DetailsButton onClick={handleDetailsButtonClick} />
      <CryptoPaymentSummaryDialog {...cryptoPaymentSummaryDialogProps} />
      <CryptoPaymentDepositDialog {...cryptoPaymentDepositDialogProps} />
      <CryptoPaymentSuccessDialog {...cryptoPaymentSuccessDialogProps} />
    </Paper>
  );
};
