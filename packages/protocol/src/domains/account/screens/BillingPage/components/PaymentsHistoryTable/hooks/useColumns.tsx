import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ECurrency } from 'modules/payments/types';
import { IPaymentHistoryTableEntity } from 'domains/account/types';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { selectPaymentOptions } from 'modules/payments/actions/fetchPaymentOptions';
import { useAppSelector } from 'store/useAppSelector';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

import { Amount } from '../components/Amount';
import { Deduction } from '../components/Deduction';
import { DetailsButton } from '../components/DetailsButton';
import {
  MAX_USD_DECIMAL_PLACES,
  MIN_USD_DECIMAL_PLACES,
  PAYMENT_HISTORY_TYPE,
} from '../const';
import { formatPaymentHistoryAmount } from '../utils/formatPaymentHistoryAmount';
import { getAmount, isCreditAmount } from '../utils/amountUtils';
import { getCreditsValue } from '../utils/getCreditsValue';
import { getCurrencySymbol } from '../utils/getCurrencySymbol';
import { getPaymentHistoryItemDirection } from '../utils/getPaymentHistoryItemDirection';
import { getTxCurrency } from '../utils/getTxCurrency';
import { useTransactionsDownloader } from './useTransactionsDownloader';

/* eslint-disable max-lines-per-function */
export const useColumns = () => {
  const downloadTransactions = useTransactionsDownloader();
  const paymentOptionsData = useAppSelector(selectPaymentOptions);

  const { walletAddress: connectedAddress } = useWalletAddress();
  const hasConnectedAddress = Boolean(connectedAddress);

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
          amountUsd,
          amountAnkr,
          network,
          currencyAddress,
          creditUsdAmount,
          creditAnkrAmount,
          type,
        }) => {
          return (
            <Amount
              currencySymbol={getCurrencySymbol({
                network,
                creditAnkrAmount,
                creditUsdAmount,
                currencyAddress,
                type,
                paymentOptions: paymentOptionsData?.options,
              })}
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
          amountUsd,
          amountAnkr,
          network,
          currencyAddress,
          creditUsdAmount,
          creditAnkrAmount,
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

          if (!txHash || !network) {
            return null;
          }

          const txCurrency = getTxCurrency({
            network,
            currencyAddress,
            paymentOptions: paymentOptionsData?.options,
          });

          return (
            <DetailsButton
              amount={amount}
              network={network}
              currency={txCurrency as unknown as ECurrency}
              txHash={txHash}
            />
          );
        },
        width: 110,
        sortable: false,
      },
    ],
    [hasConnectedAddress, paymentOptionsData],
  );
};
