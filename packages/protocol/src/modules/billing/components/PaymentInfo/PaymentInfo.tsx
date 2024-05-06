import { Typography } from '@mui/material';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { renderPaymentSummaryAmount } from 'modules/billing/utils/renderPaymentSummaryAmount';
import { renderPaymentTypeTitle } from 'modules/billing/utils/renderPaymentTypeTitle';

import { renderPaymentTypeDescription } from './utils/renderPaymentTypeDescription';
import { usePaymentInfoStyles } from './usePaymentInfoStyles';

export interface IPaymentInfoProps {
  amount: number;
  currency: ECurrency;
  paymentType: EPaymentType;
}

export const PaymentInfo = ({
  amount,
  currency,
  paymentType,
}: IPaymentInfoProps) => {
  const { classes } = usePaymentInfoStyles();

  return (
    <div className={classes.root}>
      <>
        <Typography className={classes.header} component="div" variant="body2">
          {renderPaymentTypeTitle({
            isCapitalized: true,
            isHTML: true,
            paymentType,
          })}
          {renderPaymentSummaryAmount({ amount, currency })}
        </Typography>
        <Typography className={classes.description} variant="body4">
          {renderPaymentTypeDescription(paymentType)}
        </Typography>
      </>
    </div>
  );
};
