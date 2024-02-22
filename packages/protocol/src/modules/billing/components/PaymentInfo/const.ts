import { EPaymentType } from 'modules/billing/types';

const getTitleKey = (path: string) =>
  `account.payment-types.${path}.payment-summary-title`;

const getDescriptionKey = (path: string) =>
  `account.payment-types.${path}.payment-summary-description`;

export const paymentTypeTitlesMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getTitleKey('deal'),
  [EPaymentType.OneTime]: getTitleKey('one-time'),
  [EPaymentType.Recurring]: getTitleKey('recurring'),
};

export const paymentTypeDescriptionsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getDescriptionKey('deal'),
  [EPaymentType.OneTime]: getDescriptionKey('one-time'),
  [EPaymentType.Recurring]: getDescriptionKey('recurring'),
};
