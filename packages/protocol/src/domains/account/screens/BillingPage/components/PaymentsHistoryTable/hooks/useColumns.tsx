import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ECurrency } from 'modules/payments/types';
import { IPaymentHistoryTableEntity, PaymentType } from 'domains/account/types';
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
import { isRewardConversionReason } from '../utils/isRewardConversionReason';
import { useTransactionsDownloader } from './useTransactionsDownloader';

const getTypeString = (type: PaymentType, reason: string) => {
  const isReferralReward = isRewardConversionReason(reason);

  if (isReferralReward) {
    return t('account.payment-table.payment-type.reward-conversion');
  }

  return PAYMENT_HISTORY_TYPE[type] || type;
};

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
        render: ({ reason, timestamp, type }) => {
          const typeString = getTypeString(type, reason);

          if (type === 'TRANSACTION_TYPE_DEDUCTION') {
            return (
              <Deduction
                downloader={downloadTransactions}
                timestamp={timestamp}
                type={typeString}
              />
            );
          }

          return <Typography variant="body3">{typeString}</Typography>;
        },
        sortable: false,
      },
      {
        align: 'left',
        field: 'amount_usd',
        headerName: t('account.payment-table.head.col-3'),
        render: ({
          amountAnkr,
          amountUsd,
          creditAnkrAmount,
          creditUsdAmount,
          currencyAddress,
          network,
          reason,
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
                  amountAnkr,
                  amountUsd,
                  creditAnkrAmount,
                  creditUsdAmount,
                  reason,
                  type,
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
        align: 'left',
        field: 'credit',
        headerName: t('account.payment-table.head.col-4'),
        render: ({ amount = '0', creditAnkrAmount, creditUsdAmount, type }) => (
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
          amountAnkr,
          amountUsd,
          creditAnkrAmount,
          creditUsdAmount,
          currencyAddress,
          network,
          reason,
          txHash,
          type,
        }) => {
          const amount = getAmount({
            amountAnkr,
            amountUsd,
            creditAnkrAmount,
            creditUsdAmount,
            reason,
            type,
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
