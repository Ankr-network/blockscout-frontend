import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { format } from 'date-fns';
import React, { useCallback } from 'react';

import { t } from 'common';
import { fetchDailyCharging } from 'domains/account/actions/fetchDailyCharging';
import {
  fetchPaymentHistory,
  fetchPaymentHistoryMore,
} from 'domains/account/actions/fetchPaymentHistory';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { downloadCsv } from 'modules/common/utils/downloadCsv';
import { IPaymentHistoryReponse } from 'multirpc-sdk';
import { VirtualTable, VirtualTableQuery } from 'ui';
import {
  PaymentHistoryDefaultParams,
  PAYMENT_HISTORY_PAGE_SIZE,
  preparePaymentHistoryRequest,
  usePaymentHistoryTableColumns,
  prepareDailyChargingRequest,
} from './PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export const PaymentsHistoryTable = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  const handleDownloadTransaction = useCallback(
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

  const columns = usePaymentHistoryTableColumns(handleDownloadTransaction);

  const { data, error } = useQuery<IPaymentHistoryReponse>({
    type: fetchPaymentHistory,
  });

  const handleChangeSort = useCallback(
    async (params: VirtualTableQuery) => {
      const query = preparePaymentHistoryRequest(params);

      await dispatchRequest(
        fetchPaymentHistory({
          ...query,
          cursor: 0,
          limit: params.page * PAYMENT_HISTORY_PAGE_SIZE,
        }),
      );
    },
    [dispatchRequest],
  );

  const handleChangePage = useCallback(
    async (params: VirtualTableQuery) => {
      await dispatchRequest(
        fetchPaymentHistoryMore(preparePaymentHistoryRequest(params)),
      );
    },
    [dispatchRequest],
  );

  useOnMount(() => {
    dispatchRequest(
      fetchPaymentHistory(
        preparePaymentHistoryRequest(PaymentHistoryDefaultParams),
      ),
    );
  });

  if (error || !data?.transactions?.length) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2} display="flex" flexDirection="space-between">
        <Typography variant="h5" className={classes.title}>
          {t('account.payment-table.title')}
        </Typography>
      </Box>
      <VirtualTable
        cols={columns}
        isMoreRowsAvailable={data && data.cursor !== '-1'}
        pagination="more"
        minWidth={650}
        moreBtnText={t('account.payment-table.more')}
        onChangePage={handleChangePage}
        onSort={handleChangeSort}
        rows={data?.transactions || []}
      />
    </Box>
  );
};
