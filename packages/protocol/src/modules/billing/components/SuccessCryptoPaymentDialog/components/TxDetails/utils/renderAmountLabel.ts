import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';
import { renderPaymentTypeTitle } from 'modules/billing/utils/renderPaymentTypeTitle';

export const renderAmountLabel = (paymentType: EPaymentType) =>
  t('account.success-crypto-payment-dialog.amount-label', {
    paymentType: renderPaymentTypeTitle({ paymentType, isCapitalized: true }),
  });
