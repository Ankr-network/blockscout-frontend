import { t } from 'modules/i18n/utils/intl';
import { IPaymentHistoryEntityType } from 'multirpc-sdk';
import { PAYMENT_HISTORY_TYPE } from '../../../const';

export const getPaymentTypeSelectValue = (value: unknown): string => {
  if (value === 'ALL') {
    return t('account.payment-table.payment-type.all');
  }

  if (value === 'TRANSACTION_TYPE_VOUCHER_TOPUP') {
    return t('account.payment-table.payment-type.voucher');
  }

  return value
    ? PAYMENT_HISTORY_TYPE[value as IPaymentHistoryEntityType]
    : t('account.payment-table.payment-type.placeholder');
};
