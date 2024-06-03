import {
  PaymentForm,
  usePaymentForm,
} from 'modules/payments/components/PaymentForm';

import { useAccountDetailsTopUpStyles } from './useAccountDetailsTopUpStyles';

export const AccountDetailsTopUp = () => {
  const { classes } = useAccountDetailsTopUpStyles();

  const paymentFormProps = usePaymentForm();

  return (
    <PaymentForm
      className={classes.accountTopupDialogForm}
      {...paymentFormProps}
    />
  );
};
