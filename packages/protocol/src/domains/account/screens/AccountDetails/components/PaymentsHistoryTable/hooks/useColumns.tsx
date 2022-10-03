import { IPaymentHistoryEntity } from 'multirpc-sdk';
import { VirtualTableColumn } from 'ui';

import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { Amount, CurrencySymbol } from '../components/Amount';
import { Deduction } from '../components/Deduction';
import {
  MAX_CREDIT_DECIMAL_PLACES,
  MAX_USD_DECIMAL_PLACES,
  MIN_CREDIT_DECIMAL_PLACES,
  MIN_USD_DECIMAL_PLACES,
  PAYMENT_HISTORY_TYPE,
} from '../const';
import { formatPaymentHistoryAmount } from '../utils/formatPaymentHistoryAmount';
import { getPaymentHistoryItemDirection } from '../utils/getPaymentHistoryItemDirection';
import { useTransactionsDownloader } from './useTransactionsDownloader';
import {
  getAmount,
  hasCreditAmount,
  isCreditAmount,
} from '../utils/amountUtils';

export const useColumns = () => {
  const downloadTransactions = useTransactionsDownloader();

  return useLocaleMemo(
    (): VirtualTableColumn<IPaymentHistoryEntity>[] => [
      {
        align: 'left',
        field: 'time',
        headerName: t('account.payment-table.head.col-1'),
        render: ({ timestamp }) =>
          t('account.payment-table.date-time', {
            value: new Date(Number(timestamp)),
          }),
        width: 200,
        sortable: false,
      },
      {
        align: 'left',
        field: 'type',
        headerName: t('account.payment-table.head.col-2'),
        render: ({ type, timestamp }) => {
          const typeString = PAYMENT_HISTORY_TYPE[type] || type;

          return type === 'TRANSACTION_TYPE_DEDUCTION' ? (
            <Deduction
              downloader={downloadTransactions}
              timestamp={timestamp}
              type={typeString}
            />
          ) : (
            typeString
          );
        },
        sortable: false,
      },
      {
        align: 'right',
        field: 'amount_usd',
        headerName: t('account.payment-table.head.col-3'),
        render: ({
          creditUsdAmount,
          creditAnkrAmount,
          amountUsd,
          amountAnkr,
          type,
        }) => {
          return (
            <Amount
              currencySymbol={
                isCreditAmount(type, creditAnkrAmount, creditUsdAmount)
                  ? ''
                  : Number(creditAnkrAmount) > 0
                  ? CurrencySymbol.ankr
                  : Number(creditUsdAmount) > 0
                  ? CurrencySymbol.usd
                  : CurrencySymbol.ankr
              }
              direction={
                isCreditAmount(type, creditAnkrAmount, creditUsdAmount)
                  ? undefined
                  : getPaymentHistoryItemDirection(type)
              }
              value={formatPaymentHistoryAmount(
                getAmount(
                  type,
                  creditAnkrAmount,
                  creditUsdAmount,
                  amountAnkr,
                  amountUsd,
                ),
                MIN_USD_DECIMAL_PLACES,
                MAX_USD_DECIMAL_PLACES,
              )}
            />
          );
        },
        sortable: false,
      },
      {
        align: 'right',
        field: 'credit',
        headerName: t('account.payment-table.head.col-4'),
        render: ({ creditUsdAmount, creditAnkrAmount, type, amount }) => {
          return (
            <Amount
              direction={getPaymentHistoryItemDirection(type)}
              value={formatPaymentHistoryAmount(
                hasCreditAmount(creditAnkrAmount, creditUsdAmount)
                  ? amount
                  : Number(creditUsdAmount) > 0
                  ? creditUsdAmount
                  : creditAnkrAmount,

                MIN_CREDIT_DECIMAL_PLACES,
                MAX_CREDIT_DECIMAL_PLACES,
              )}
            />
          );
        },
        sortable: false,
      },
    ],
    [],
  );
};
