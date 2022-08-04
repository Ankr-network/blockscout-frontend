import { IPaymentHistoryEntity } from 'multirpc-sdk';
import { VirtualTableColumn } from 'ui';

import { Amount } from '../components/Amount';
import { Deduction } from '../components/Deduction';
import {
  MAX_ANKR_DECIMAL_PLACES,
  MAX_USD_DECIMAL_PLACES,
  MIN_ANKR_DECIMAL_PLACES,
  MIN_USD_DECIMAL_PLACES,
  PAYMENT_HISTORY_TYPE,
} from '../const';
import { formatPaymentHistoryAmount } from '../utils/formatPaymentHistoryAmount';
import { getPaymentHistoryItemDirection } from '../utils/getPaymentHistoryItemDirection';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useTransactionsDownloader } from './useTransactionsDownloader';

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
        render: ({ amountUsd, type }) => (
          <Amount
            currencySymbol="$"
            direction={getPaymentHistoryItemDirection(type)}
            value={formatPaymentHistoryAmount(
              amountUsd,
              MIN_USD_DECIMAL_PLACES,
              MAX_USD_DECIMAL_PLACES,
            )}
          />
        ),
        sortable: false,
      },
      {
        align: 'right',
        field: 'amount_ankr',
        headerName: t('account.payment-table.head.col-4'),
        render: ({ amountAnkr, type }) => (
          <Amount
            direction={getPaymentHistoryItemDirection(type)}
            value={formatPaymentHistoryAmount(
              amountAnkr,
              MIN_ANKR_DECIMAL_PLACES,
              MAX_ANKR_DECIMAL_PLACES,
            )}
          />
        ),
        sortable: false,
      },
    ],
    [],
  );
};
