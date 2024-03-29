import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';
import { CircleCheck, Mark, OverlaySpinner } from '@ankr.com/ui';

import { useOngoingPaymentStatusStyles } from './useOngoingPaymentStatusStyles';

interface IOngoingPaymentStatusProps {
  status?: 'pending' | 'success' | 'error';
}

export const OngoingPaymentStatus = ({
  status = 'pending',
}: IOngoingPaymentStatusProps) => {
  const { cx, classes } = useOngoingPaymentStatusStyles();

  switch (status) {
    case 'success':
      return (
        <Typography
          className={cx(classes.paymentStatus, classes[status])}
          color={status}
          variant="body3"
        >
          <CircleCheck className={cx(classes.icon, classes.iconSuccess)} />{' '}
          {t('account.account-details.ongoing-payments.status.success')}
        </Typography>
      );
    case 'error':
      return (
        <Typography
          className={cx(classes.paymentStatus, classes[status])}
          color={status}
          variant="body3"
        >
          <Mark className={cx(classes.icon, classes.iconError)} />{' '}
          {t('account.account-details.ongoing-payments.status.error')}
        </Typography>
      );
    default:
    case 'pending':
      return (
        <Typography
          className={cx(classes.paymentStatus, classes[status])}
          color="textSecondary"
          variant="body3"
        >
          <OverlaySpinner size={14} className={classes.icon} />{' '}
          {t('account.account-details.ongoing-payments.status.pending')}
        </Typography>
      );
  }
};
