import { Typography } from '@mui/material';

import {
  ECurrency,
  EPaymentType,
  DEAL_UPGRADE_PAYMENT_TYPE,
} from 'modules/payments/types';
import { renderPaymentSummaryAmount } from 'modules/payments/utils/renderPaymentSummaryAmount';

import { PaymentTypeTitle } from '../PaymentTypeTitle';
import { renderPaymentTypeDescription } from './utils/renderPaymentTypeDescription';
import { usePaymentInfoStyles } from './usePaymentInfoStyles';

export interface IPaymentInfoProps {
  amount: number;
  currency: ECurrency;
  paymentType: EPaymentType;
  currentAmount?: number;
  reqs?: number;
}

export const PaymentInfo = ({
  amount,
  currency,
  currentAmount,
  paymentType,
  reqs,
}: IPaymentInfoProps) => {
  const { classes } = usePaymentInfoStyles();

  const shouldHideDescription =
    paymentType === EPaymentType.Deal && (!amount || !reqs);

  const isDealUpgradePayment =
    paymentType === EPaymentType.Deal && currentAmount;

  const paymentTypeExtended = isDealUpgradePayment
    ? DEAL_UPGRADE_PAYMENT_TYPE
    : paymentType;

  return (
    <div className={classes.root}>
      <>
        <Typography className={classes.header} component="div" variant="body2">
          <PaymentTypeTitle
            isCapitalized
            isHTML
            paymentType={paymentTypeExtended}
          />
          {renderPaymentSummaryAmount({ amount, currency })}
        </Typography>
        {!shouldHideDescription && (
          <Typography className={classes.description} variant="body4">
            {renderPaymentTypeDescription({
              paymentType: paymentTypeExtended,
              currentAmount,
              newAmount: amount,
              reqs,
            })}
          </Typography>
        )}
      </>
    </div>
  );
};
