import { useCallback, useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { t } from 'common';
import { fetchPaymentHistory } from 'domains/account/actions/fetchPaymentHistory';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { IPaymentHistoryReponse } from 'multirpc-sdk';
import { Preloader, VirtualTable } from 'ui';
import {
  getPaymentHistoryDefaultParams,
  preparePaymentHistoryRequest,
  usePaymentHistoryTableColumns,
  useDownloadTransaction,
  getFilteredTransactions,
} from './PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';
import { Filters } from './Filters';

export const PaymentsHistoryTable = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  const handleDownloadTransaction = useDownloadTransaction(dispatchRequest);

  const columns = usePaymentHistoryTableColumns(handleDownloadTransaction);

  const { data, loading } = useQuery<IPaymentHistoryReponse>({
    type: fetchPaymentHistory,
  });

  useOnMount(() => {
    dispatchRequest(fetchPaymentHistory(getPaymentHistoryDefaultParams()));
  });

  const handleFetchPaymentHistory = useCallback(
    (from, to, types) => {
      dispatchRequest(
        fetchPaymentHistory(preparePaymentHistoryRequest(from, to, types)),
      );
    },
    [dispatchRequest],
  );
  const preloader = loading ? (
    <Preloader className={classes.preloader} />
  ) : null;

  const filteredTransactions = useMemo(
    () => getFilteredTransactions(data?.transactions),
    [data?.transactions],
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2} className={classes.top}>
        <Typography variant="h5" className={classes.title}>
          {t('account.payment-table.title')}
        </Typography>
        <Filters onFetchPaymentHistory={handleFetchPaymentHistory} />
      </Box>
      <VirtualTable
        cols={columns}
        minWidth={650}
        preloader={preloader}
        rows={filteredTransactions}
        emptyMessage={t('account.payment-table.empty')}
      />
    </Box>
  );
};
