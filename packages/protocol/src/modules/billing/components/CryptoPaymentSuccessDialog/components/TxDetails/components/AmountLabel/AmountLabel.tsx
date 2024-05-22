import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';
import { PaymentTypeTitle } from 'modules/billing/components/PaymentForm/components/PaymentTypeTitle/PaymentTypeTitle';

interface IAmountLabelProps {
  paymentType: EPaymentType;
}

export const AmountLabel = ({ paymentType }: IAmountLabelProps) => {
  return (
    <>
      <PaymentTypeTitle paymentType={paymentType} isCapitalized />{' '}
      {t('account.success-crypto-payment-dialog.amount-label')}
    </>
  );
};
