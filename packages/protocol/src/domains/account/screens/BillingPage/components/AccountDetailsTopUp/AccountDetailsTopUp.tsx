import { PaymentForm } from 'modules/billing/components/PaymentForm';
import { usePaymentForm } from 'modules/billing/components/PaymentForm/hooks/usePaymentForm';

import { useOngoingCryptoPayment } from '../../hooks/useOngoingCryptoPayment';
import { useAccountDetailsTopUpStyles } from './useAccountDetailsTopUpStyles';

export const AccountDetailsTopUp = () => {
  const { classes } = useAccountDetailsTopUpStyles();

  const { onOpen } = useOngoingCryptoPayment();

  const paymentFormProps = usePaymentForm({
    onDepositSuccess: onOpen,
  });

  return (
    <PaymentForm
      className={classes.accountTopupDialogForm}
      {...paymentFormProps}
    />
  );
};
