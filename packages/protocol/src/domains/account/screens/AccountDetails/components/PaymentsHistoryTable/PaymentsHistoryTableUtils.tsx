import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { t } from 'common';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { IPaymentHistoryEntity, IPaymentHistoryEntityType } from 'multirpc-sdk';
import { VirtualTableColumn, VirtualTableQuery } from 'ui';
import { useStyles } from './useStyles';

export const PAYMENT_HISTORY_TYPE: Record<IPaymentHistoryEntityType, string> = {
  TRANSACTION_TYPE_UNKNOWN: 'Unknown',
  TRANSACTION_TYPE_DEPOSIT: 'Top Up',
  TRANSACTION_TYPE_DEDUCTION: 'Payment charging',
  TRANSACTION_TYPE_WITHDRAW: 'Withdrawal',
  TRANSACTION_TYPE_BONUS: 'Bonus',
  TRANSACTION_TYPE_COMPENSATION: 'Compensation',
};

export const PAYMENT_HISTORY_PAGE_SIZE = 10;

export const PaymentHistoryDefaultParams = {
  page: 1,
  order_by: 'timestamp',
  sort: 'desc',
};

export const getPaymentHistoryItemDirection = (
  type: IPaymentHistoryEntity['type'],
): boolean | undefined => {
  if (['TRANSACTION_TYPE_UNKNOWN'].includes(type)) {
    return undefined;
  }

  return [
    'TRANSACTION_TYPE_DEPOSIT',
    'TRANSACTION_TYPE_BONUS',
    'TRANSACTION_TYPE_COMPENSATION',
  ].includes(type);
};

export const getPaymentHistoryItemSign = (direction?: boolean): string => {
  if (typeof direction === 'undefined') {
    return '';
  }
  return direction ? '+' : '-';
};

export const preparePaymentHistoryRequest = ({
  page,
  order,
  orderBy,
}: VirtualTableQuery) => {
  const cursor =
    (page || 1) * PAYMENT_HISTORY_PAGE_SIZE - PAYMENT_HISTORY_PAGE_SIZE;
  const limit = PAYMENT_HISTORY_PAGE_SIZE;

  return {
    sort: order,
    order_by: orderBy,
    cursor,
    limit,
  };
};

export const formatPaymentHistoryAmount = (amount: string) => {
  return new BigNumber(amount).toFixed(2);
};

export const usePaymentHistoryTableColumns = () => {
  const classes = useStyles();

  return useLocaleMemo(
    () =>
      [
        {
          field: 'time',
          headerName: t('account.payment-table.head.col-1'),
          render: ({ timestamp }) =>
            t('account.payment-table.date-time', {
              value: new Date(Number(timestamp)),
            }),
          align: 'left',
          width: 200,
          sortable: true,
        },
        {
          field: 'type',
          headerName: t('account.payment-table.head.col-2'),
          render: ({ type }) => PAYMENT_HISTORY_TYPE[type] || type,
          align: 'left',
          sortable: true,
        },
        {
          field: 'amount_usd',
          headerName: t('account.payment-table.head.col-3'),
          render: ({ type, amountUsd }) => {
            const direction = getPaymentHistoryItemDirection(type);
            const sign = getPaymentHistoryItemSign(direction);

            return (
              <span
                className={classNames(classes.cellBold, {
                  [classes.cellTopUp]: direction,
                })}
              >
                {sign}${formatPaymentHistoryAmount(amountUsd)}
              </span>
            );
          },
          align: 'right',
          sortable: true,
        },
        {
          field: 'amount_ankr',
          headerName: t('account.payment-table.head.col-4'),
          render: ({ type, amountAnkr }) => {
            const direction = getPaymentHistoryItemDirection(type);
            const sign = getPaymentHistoryItemSign(direction);

            return (
              <span
                className={classNames(classes.cellBold, {
                  [classes.cellTopUp]: direction,
                })}
              >
                {sign}
                {formatPaymentHistoryAmount(amountAnkr)}
              </span>
            );
          },
          align: 'right',
          sortable: true,
        },
      ] as VirtualTableColumn<IPaymentHistoryEntity>[],
    [],
  );
};
