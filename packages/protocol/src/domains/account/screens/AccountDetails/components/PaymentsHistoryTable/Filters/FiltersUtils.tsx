import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { IPaymentEntityType, ITimeType } from './FiltersTypes';
import { IPaymentHistoryEntityType } from 'multirpc-sdk';

export const DEFAULT_TIME_VALUE = 'WEEK';

export const useTimeSelectOptions = () => {
  return useLocaleMemo(
    () => [
      {
        value: 'WEEK',
        label: t('account.payment-table.time-type.week'),
      },
      {
        value: 'MONTH',
        label: t('account.payment-table.time-type.month'),
      },
      {
        value: 'YEAR',
        label: t('account.payment-table.time-type.year'),
      },
    ],
    [],
  );
};

// note: commented options will be available in a future version of PAYG
export const useTypeSelectOptions = () => {
  return useLocaleMemo(
    () => [
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
};

const DAY_OFFSET = 24 * 60 * 60 * 1000;

export const prepareTimeForRequest = (value: ITimeType) => {
  switch (value) {
    case 'WEEK': {
      const to = Date.now();
      const dateOffset = DAY_OFFSET * 7;

      return {
        from: to - dateOffset,
        to,
      };
    }

    case 'MONTH': {
      const to = Date.now();
      const dateOffset = DAY_OFFSET * 31;

      return {
        from: to - dateOffset,
        to,
      };
    }

    case 'YEAR':
    default: {
      const to = Date.now();
      const dateOffset = DAY_OFFSET * 365;

      return {
        from: to - dateOffset,
        to,
      };
    }
  }
};

export const prepareTypeForRequest = (
  value: IPaymentEntityType,
): IPaymentHistoryEntityType[] | undefined => {
  if (value === 'ALL') {
    return undefined;
  }

  if (value === 'TRANSACTION_TYPE_WITHDRAW') {
    return [
      value,
      'TRANSACTION_TYPE_WITHDRAW_INIT',
      'TRANSACTION_TYPE_WITHDRAW_ADJUST',
    ];
  }

  if (value === 'TRANSACTION_TYPE_VOUCHER_TOPUP') {
    return [
      value,
      'TRANSACTION_TYPE_VOUCHER_TOPUP',
      'TRANSACTION_TYPE_VOUCHER_ADJUST',
    ];
  }

  return [value];
};
