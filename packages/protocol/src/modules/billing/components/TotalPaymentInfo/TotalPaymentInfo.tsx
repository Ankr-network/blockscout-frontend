import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  IRenderPaymentSummaryAmountParams,
  renderPaymentSummaryAmount,
} from 'modules/billing/utils/renderPaymentSummaryAmount';

import { useTotalPaymentInfoStyles } from './useTotalPaymentInfoStyles';

export interface ITotalPaymentInfoProps
  extends IRenderPaymentSummaryAmountParams {}

export const TotalPaymentInfo = ({
  amount,
  currency,
}: ITotalPaymentInfoProps) => {
  const { classes } = useTotalPaymentInfoStyles();

  return (
    <Typography className={classes.root} component="div" variant="subtitle2">
      {t('account.payment-summary-dialog.total-label')}
      {renderPaymentSummaryAmount({ amount, currency })}
    </Typography>
  );
};
