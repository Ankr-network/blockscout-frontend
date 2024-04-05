import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { IPaymentHistoryTableEntity, PaymentType } from 'domains/account/types';

import { Amount, CurrencySymbol } from '../components/Amount';
import { Deduction } from '../components/Deduction';
import { DetailsButton } from '../components/DetailsButton';
import {
  MAX_USD_DECIMAL_PLACES,
  MIN_USD_DECIMAL_PLACES,
  PAYMENT_HISTORY_TYPE,
} from '../const';
import { formatPaymentHistoryAmount } from '../utils/formatPaymentHistoryAmount';
import { getPaymentHistoryItemDirection } from '../utils/getPaymentHistoryItemDirection';
import { useTransactionsDownloader } from './useTransactionsDownloader';
import { getAmount, isCreditAmount } from '../utils/amountUtils';
import { getCreditsValue } from '../utils/getCreditsValue';

const getCurrencySymbol = (
  type: PaymentType,
  creditAnkrAmount: string,
  creditUsdAmount: string,
) => {
  if (isCreditAmount(type, creditAnkrAmount, creditUsdAmount)) {
    return '';
  }

  if (Number(creditAnkrAmount) > 0) {
    return CurrencySymbol.ankr;
  }

  if (Number(creditUsdAmount) > 0) {
    return CurrencySymbol.usd;
  }

  return CurrencySymbol.ankr;
};

/* eslint-disable max-lines-per-function */
export const useColumns = () => {
  const downloadTransactions = useTransactionsDownloader();

  return useLocaleMemo(
    (): VirtualTableColumn<IPaymentHistoryTableEntity>[] => [
      {
        align: 'left',
        field: 'time',
        headerName: t('account.payment-table.head.col-1'),
        render: ({ timestamp }) => (
          <Typography variant="body3">
            {t('account.payment-table.date-time', {
              value: new Date(Number(timestamp)),
            })}
          </Typography>
        ),
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
            <Typography variant="body3">{typeString}</Typography>
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
              currencySymbol={getCurrencySymbol(
                type,
                creditAnkrAmount,
                creditUsdAmount,
              )}
              direction={
                isCreditAmount(type, creditAnkrAmount, creditUsdAmount)
                  ? undefined
                  : getPaymentHistoryItemDirection(type)
              }
              value={formatPaymentHistoryAmount(
                getAmount({
                  type,
                  creditAnkrAmount,
                  creditUsdAmount,
                  amountAnkr,
                  amountUsd,
                }),
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
        render: ({ creditUsdAmount, creditAnkrAmount, type, amount = '0' }) => (
          <Amount
            direction={getPaymentHistoryItemDirection(type)}
            value={getCreditsValue({
              creditUsdAmount,
              creditAnkrAmount,
              amount,
            })}
          />
        ),
        sortable: false,
      },
      {
        align: 'right',
        field: 'button',
        headerName: t('account.payment-table.head.col-5'),
        render: ({
          creditUsdAmount,
          creditAnkrAmount,
          amountUsd,
          amountAnkr,
          type,
          txHash,
        }) => {
          const amount = getAmount({
            type,
            creditAnkrAmount,
            creditUsdAmount,
            amountAnkr,
            amountUsd,
          });

          return txHash && <DetailsButton amount={amount} txHash={txHash} />;
        },
        width: 110,
        sortable: false,
      },
    ],
    [],
  );
};
