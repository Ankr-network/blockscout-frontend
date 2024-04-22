import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { ISelectOption } from 'uiKit/Select';
import { PaymentType } from 'domains/account/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { getPaymentTypeSelectValue } from '../utils/getPaymentTypeSelectValue';

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
      {
        value: 'TRANSACTION_TYPE_DEPOSIT',
        label: t('account.payment-table.payment-type.payg'),
      },
      {
        value: 'TRANSACTION_TYPE_DEAL_DEPOSIT',
        label: t('account.payment-table.payment-type.deal'),
      },
      {
        value: 'TRANSACTION_TYPE_DEDUCTION',
        label: t('account.payment-table.payment-type.deduction'),
      },
      {
        value: 'TRANSACTION_TYPE_VOUCHER_TOPUP',
        label: t('account.payment-table.payment-type.voucher'),
      },
    ],
    [],
  );

  const renderValue = useCallback(getPaymentTypeSelectValue, []);

  return [changePaymentType, options, renderValue];
};
