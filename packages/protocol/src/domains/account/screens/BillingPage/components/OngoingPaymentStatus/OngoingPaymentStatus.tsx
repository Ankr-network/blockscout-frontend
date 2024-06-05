import { CircleCheck, Mark, OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { EOngoingPaymentStatus } from 'modules/billing/types';

import { useOngoingPaymentStatusStyles } from './useOngoingPaymentStatusStyles';

export interface IOngoingPaymentStatusProps {
  status?: EOngoingPaymentStatus;
}

export const OngoingPaymentStatus = ({
  status = EOngoingPaymentStatus.Pending,
}: IOngoingPaymentStatusProps) => {
  const { cx, classes } = useOngoingPaymentStatusStyles();

  switch (status) {
    case EOngoingPaymentStatus.Success:
      return (
        <Typography
          className={cx(classes.paymentStatus, classes.success)}
          color="success"
          variant="body3"
        >
          <CircleCheck className={cx(classes.icon, classes.iconSuccess)} />{' '}
          {t('account.account-details.ongoing-payments.status.success')}
        </Typography>
      );
    case EOngoingPaymentStatus.Error:
      return (
        <Typography
          className={cx(classes.paymentStatus, classes.error)}
          color="error"
          variant="body3"
        >
          <Mark className={cx(classes.icon, classes.iconError)} />{' '}
          {t('account.account-details.ongoing-payments.status.error')}
        </Typography>
      );
    case EOngoingPaymentStatus.ConfirmationBlocksWaiting:
      return (
        <Typography
          className={cx(classes.paymentStatus, classes.pending)}
          color="textSecondary"
          variant="body3"
        >
          <OverlaySpinner size={14} className={classes.icon} />{' '}
          {t('account.account-details.ongoing-payments.status.waiting')}
        </Typography>
      );
    default:
    case EOngoingPaymentStatus.Pending:
      return (
        <Typography
          className={cx(classes.paymentStatus, classes.pending)}
          color="textSecondary"
          variant="body3"
        >
          <OverlaySpinner size={14} className={classes.icon} />{' '}
          {t('account.account-details.ongoing-payments.status.pending')}
        </Typography>
      );
  }
};
