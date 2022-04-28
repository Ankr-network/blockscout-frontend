import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { t } from 'common';
import {
  fetchPaymentHistory,
  fetchPaymentHistoryMore,
} from 'domains/account/actions/fetchPaymentHistory';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { IPaymentHistoryReponse } from 'multirpc-sdk';
import React, { useCallback } from 'react';
import { VirtualTable, VirtualTableQuery } from 'ui';
import {
  PaymentHistoryDefaultParams,
  preparePaymentHistoryRequest,
  usePaymentHistoryTableColumns,
} from './PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export const PaymentsHistoryTable = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();
  const columns = usePaymentHistoryTableColumns();

  const { data, loading, error } = useQuery<IPaymentHistoryReponse>({
    type: fetchPaymentHistory,
  });

  const handleChangeSort = useCallback(
    async (params: VirtualTableQuery) => {
      await dispatchRequest(
        fetchPaymentHistory(preparePaymentHistoryRequest(params)),
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

  if (error || (!loading && !data?.transactions?.length)) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2} display="flex" flexDirection="space-between">
        <Typography variant="h3" className={classes.title}>
          {t('account.payment-table.title')}
        </Typography>
      </Box>
      <VirtualTable
        cols={columns}
        isMoreRowsAvailable={data && data.cursor !== '-1'}
        pagination="more"
        minWidth={600}
        moreBtnText={t('account.payment-table.more')}
        onChangePage={handleChangePage}
        onSort={handleChangeSort}
        rows={data?.transactions || []}
        isLoading={loading && !data}
      />
    </Box>
  );
};
