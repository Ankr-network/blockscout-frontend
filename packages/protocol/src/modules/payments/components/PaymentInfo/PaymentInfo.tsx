import { Typography } from '@mui/material';

import { ECurrency, EPaymentType } from 'modules/payments/types';
import { renderPaymentSummaryAmount } from 'modules/payments/utils/renderPaymentSummaryAmount';

import { PaymentTypeTitle } from '../PaymentTypeTitle';
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
          <PaymentTypeTitle isCapitalized isHTML paymentType={paymentType} />
          {renderPaymentSummaryAmount({ amount, currency })}
        </Typography>
        <Typography className={classes.description} variant="body4">
          {renderPaymentTypeDescription(paymentType)}
        </Typography>
      </>
    </div>
  );
};
