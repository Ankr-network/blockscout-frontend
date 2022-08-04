import { useCallback } from 'react';

import { ISelectOption } from 'uiKit/Select';
import { PaymentType } from 'domains/account/types';
import { getPaymentTypeSelectValue } from '../utils/getPaymentTypeSelectValue';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

export type PaymentTypeSelect = [
  (event: any) => void,
  ISelectOption[],
  (value: unknown) => string,
];

export const usePaymentTypeSelect = (
  setPaymentType: (type: PaymentType) => void,
): PaymentTypeSelect => {
  const changePaymentType = useCallback(
    (event: any) => {
      const value = (event?.target?.value || 'ALL') as PaymentType;

      setPaymentType(value);
    },
    [setPaymentType],
  );

  // note: commented options will be available in a future version of PAYG
  const options = useLocaleMemo(
    (): ISelectOption[] => [
      {
        value: 'ALL',
        label: t('account.payment-table.payment-type.all'),
      },
      // {
      //   value: 'TRANSACTION_TYPE_UNKNOWN',
      //   label: t('account.payment-table.payment-type.unknown'),
      // },
      {
        value: 'TRANSACTION_TYPE_DEPOSIT',
        label: t('account.payment-table.payment-type.top-up'),
      },
      {
        value: 'TRANSACTION_TYPE_DEDUCTION',
        label: t('account.payment-table.payment-type.deduction'),
      },
      {
        value: 'TRANSACTION_TYPE_WITHDRAW',
        label: t('account.payment-table.payment-type.withdrawal'),
      },
      {
        value: 'TRANSACTION_TYPE_VOUCHER_TOPUP',
        label: t('account.payment-table.payment-type.voucher'),
      },
      // {
      //   value: 'TRANSACTION_TYPE_BONUS',
      //   label: t('account.payment-table.payment-type.bonus'),
      // },
      // {
      //   value: 'TRANSACTION_TYPE_COMPENSATION',
      //   label: t('account.payment-table.payment-type.compensation'),
      // },
    ],
    [],
  );

  const renderValue = useCallback(getPaymentTypeSelectValue, []);

  return [changePaymentType, options, renderValue];
};
