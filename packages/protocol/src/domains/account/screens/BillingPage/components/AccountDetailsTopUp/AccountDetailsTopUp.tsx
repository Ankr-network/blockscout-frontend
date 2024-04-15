import { PaymentForm } from 'modules/billing/components/PaymentForm';

import { useAccountDetailsTopUpStyles } from './useAccountDetailsTopUpStyles';
import { usePaymentForm } from '../../hooks/usePaymentForm';

export const AccountDetailsTopUp = () => {
  const { classes } = useAccountDetailsTopUpStyles();

  const { paymentFormProps } = usePaymentForm();

  return (
    <PaymentForm
      className={classes.accountTopupDialogForm}
      {...paymentFormProps}
    />
  );
};
