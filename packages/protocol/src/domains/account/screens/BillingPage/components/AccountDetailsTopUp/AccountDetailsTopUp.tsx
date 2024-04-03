import { PaymentForm } from 'modules/billing/components/PaymentForm';

import { useAccountDetailsTopUpStyles } from './useAccountDetailsTopUpStyles';
import { useOngoingCryptoPayment } from '../../hooks/useOngoingCryptoPayment';
import { usePaymentForm } from '../../hooks/usePaymentForm';

export const AccountDetailsTopUp = () => {
  const { classes } = useAccountDetailsTopUpStyles();

  const { onOpen: onDepositSuccess } = useOngoingCryptoPayment();

  const { paymentFormProps } = usePaymentForm({ onDepositSuccess });

  return (
    <PaymentForm
      className={classes.accountTopupDialogForm}
      {...paymentFormProps}
    />
  );
};
