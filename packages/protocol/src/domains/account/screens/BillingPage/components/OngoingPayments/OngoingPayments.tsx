import { t } from '@ankr.com/common';
import { Button, Paper, Typography } from '@mui/material';
import { Ankr } from '@ankr.com/ui';

import { OngoingPaymentStatus } from '../OngoingPaymentStatus';
import { useOngoingPaymentsStyles } from './useOngoingPaymentsStyles';

interface IOngoingPaymentsProps {
  className?: string;
  onViewDetailsButtonClick: () => void;
  status: 'pending' | 'success' | 'error';
}

export const OngoingPayments = ({
  className,
  onViewDetailsButtonClick,
  status,
}: IOngoingPaymentsProps) => {
  const { cx, classes } = useOngoingPaymentsStyles();

  return (
    <section className={cx(classes.ongoingPaymentRoot, className)}>
      <Typography variant="h6" className={classes.ongoingPaymentTitle}>
        {t('account.account-details.ongoing-payments.title')}
      </Typography>
      <Paper className={classes.ongoingPaymentPaper}>
        <Typography variant="body2">
          {t('account.account-details.ongoing-payments.one-time-payment')}
        </Typography>

        <Typography variant="body3" className={classes.paymentValue}>
          {/* TODO: pass proper values */}
          <Ankr className={classes.iconAnkr} /> 2000 ANKR{' '}
          <Typography variant="body3" color="textSecondary">
            / ≈$47.14
          </Typography>
        </Typography>

        <OngoingPaymentStatus status={status} />

        <Button
          onClick={onViewDetailsButtonClick}
          variant="outlined"
          size="small"
        >
          {t('account.account-details.ongoing-payments.details-btn')}
        </Button>
      </Paper>
    </section>
  );
};
