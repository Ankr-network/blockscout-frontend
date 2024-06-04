import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useAppSelector } from 'store/useAppSelector';
import { selectOngoingCryptoTransactions } from 'modules/payments/store/selectors';

import { OngoingPayment } from '../OngoingPayment';
import { useOngoingPaymentsStyles } from './useOngoingPaymentsStyles';

export interface IOngoingPaymentsProps {
  className?: string;
}

export const OngoingPayments = ({ className }: IOngoingPaymentsProps) => {
  const ongoingTxs = useAppSelector(selectOngoingCryptoTransactions);

  const { classes } = useOngoingPaymentsStyles();

  return (
    <section className={className}>
      <Typography className={classes.title} variant="h6">
        {t('account.account-details.ongoing-payments.title')}
      </Typography>
      {ongoingTxs.map(tx => (
        <OngoingPayment tx={tx} key={tx.id} />
      ))}
    </section>
  );
};
