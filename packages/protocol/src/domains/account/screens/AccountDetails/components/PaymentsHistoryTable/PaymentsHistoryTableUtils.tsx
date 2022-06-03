import React, { useCallback } from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ClassNameMap } from '@material-ui/styles';
import {
  IPaymentHistoryEntity,
  IPaymentHistoryEntityType,
  IDailyChargingParams,
} from 'multirpc-sdk';
import { format } from 'date-fns';
import { DispatchRequest } from '@redux-requests/core';

import { t } from 'common';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { VirtualTableColumn } from 'ui';
import { useStyles } from './useStyles';
import { ArrowTopRightIcon } from 'uiKit/Icons/ArrowTopRightIcon';
import { downloadCsv } from 'modules/common/utils/downloadCsv';
import { fetchDailyCharging } from 'domains/account/actions/fetchDailyCharging';
import {
  DEFAULT_TIME_VALUE,
  prepareTimeForRequest,
} from './Filters/FiltersUtils';

export const PAYMENT_HISTORY_TYPE: Record<IPaymentHistoryEntityType, string> = {
  TRANSACTION_TYPE_UNKNOWN: 'Unknown',
  TRANSACTION_TYPE_DEPOSIT: 'Top Up',
  TRANSACTION_TYPE_DEDUCTION: 'Payment charging',
  TRANSACTION_TYPE_WITHDRAW: 'Withdrawal',
  TRANSACTION_TYPE_BONUS: 'Bonus',
  TRANSACTION_TYPE_COMPENSATION: 'Compensation',
};

export const PAYMENT_HISTORY_PAGE_SIZE = 10;

export const getPaymentHistoryDefaultParams = () => ({
  ...prepareTimeForRequest(DEFAULT_TIME_VALUE),
  time_group: 'DAY',
});

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

export const preparePaymentHistoryRequest = (
  from?: number,
  to?: number,
  type?: IPaymentHistoryEntityType,
) => {
  return {
    from,
    to,
    time_group: 'DAY',
    types: type,
  };
};

const getDecimalPlaces = (
  value: BigNumber,
  minDecimalPlaces: number,
  maxDecimalPlaces: number,
): number => {
  const decimalPlaces = value.decimalPlaces();

  if (decimalPlaces <= minDecimalPlaces) {
    return minDecimalPlaces;
  }

  if (decimalPlaces >= maxDecimalPlaces) {
    return maxDecimalPlaces;
  }

  return decimalPlaces;
};

const MIN_USD_DECIMAL_PLACES = 2;
const MAX_USD_DECIMAL_PLACES = 7;

const MIN_ANKR_DECIMAL_PLACES = 2;
const MAX_ANKR_DECIMAL_PLACES = 5;

export const formatPaymentHistoryAmount = (
  amount: string,
  minDecimalPlaces: number,
  maxDecimalPlaces: number,
) => {
  const value = new BigNumber(amount);

  const decimalPlaces = getDecimalPlaces(
    value,
    minDecimalPlaces,
    maxDecimalPlaces,
  );

  return value.toFormat(decimalPlaces, 0);
};

const MS_IN_DAY = 3_600_000 * 24;
const MS_IN_WEEK = 7 * MS_IN_DAY;

const renderDeductionPayment = (
  type: IPaymentHistoryEntityType,
  timestamp: string,
  downloadTransaction: (timestamp: string) => void,
  classes: ClassNameMap<string>,
) => {
  const canDownload = Number(timestamp) > Date.now() - MS_IN_WEEK;

  return (
    <span
      onClick={() => (canDownload ? downloadTransaction(timestamp) : null)}
      role="button"
      tabIndex={0}
      className={classNames(classes.transaction, {
        [classes.cellDownload]: canDownload,
      })}
    >
      {PAYMENT_HISTORY_TYPE[type] || type}{' '}
      {canDownload && <ArrowTopRightIcon className={classes.arrowIcon} />}
    </span>
  );
};

export const usePaymentHistoryTableColumns = (downloadTransaction: any) => {
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
          sortable: false,
        },
        {
          field: 'type',
          headerName: t('account.payment-table.head.col-2'),
          render: ({ type, timestamp }) => {
            if (type === 'TRANSACTION_TYPE_DEDUCTION') {
              return renderDeductionPayment(
                type,
                timestamp,
                downloadTransaction,
                classes,
              );
            }

            return PAYMENT_HISTORY_TYPE[type] || type;
          },
          align: 'left',
          sortable: false,
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
                {sign}$
                {formatPaymentHistoryAmount(
                  amountUsd,
                  MIN_USD_DECIMAL_PLACES,
                  MAX_USD_DECIMAL_PLACES,
                )}
              </span>
            );
          },
          align: 'right',
          sortable: false,
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
                {formatPaymentHistoryAmount(
                  amountAnkr,
                  MIN_ANKR_DECIMAL_PLACES,
                  MAX_ANKR_DECIMAL_PLACES,
                )}
              </span>
            );
          },
          align: 'right',
          sortable: false,
        },
      ] as VirtualTableColumn<IPaymentHistoryEntity>[],
    [],
  );
};

export const prepareDailyChargingRequest = (
  timestamp: string,
): IDailyChargingParams => {
  const currentDate = new Date().getDate();
  const timestampDate = new Date(Number(timestamp)).getDate();

  return {
    day_offset: currentDate - timestampDate,
  };
};

export const useDownloadTransaction = (dispatchRequest: DispatchRequest) => {
  return useCallback(
    async (timestamp: string) => {
      const query = prepareDailyChargingRequest(timestamp);

      const { data } = await dispatchRequest(fetchDailyCharging(query));

      if (data) {
        const date = new Date(Number(timestamp));

        downloadCsv(
          data,
          t('account.payment-table.csv-title', {
            month: format(date, 'LLLL'),
            day: format(date, 'dd'),
            year: format(date, 'yyyy'),
          }),
        );
      }
    },
    [dispatchRequest],
  );
};
