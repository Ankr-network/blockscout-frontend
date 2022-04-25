import { Box, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { t } from 'common';
import {
  fetchPaymentHistory,
  fetchPaymentHistoryMore,
} from 'domains/account/actions/fetchPaymentHistory';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { IPaymentHistoryReponse } from 'multirpc-sdk';
import React, { useCallback, useState } from 'react';
import { PaymentsHistoryTable } from '.';
import {
  PaymentHistoryDefaultParams,
  preparePaymentHistoryRequest,
  UsePaymentHistoryTableUtilsParams,
} from './PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export const PaymentsHistoryTableWrapped = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isSortLoading, setIsSortLoading] = useState(false);

  const { data, loading, error } = useQuery<IPaymentHistoryReponse>({
    type: fetchPaymentHistory,
  });

  const handleChangeSort = useCallback(
    async (params: UsePaymentHistoryTableUtilsParams) => {
      setIsSortLoading(true);
      await dispatchRequest(
        fetchPaymentHistory(preparePaymentHistoryRequest(params)),
      );
      setIsSortLoading(false);
    },
    [dispatchRequest],
  );

  const handleChangePage = useCallback(
    async (params: UsePaymentHistoryTableUtilsParams) => {
      setIsMoreLoading(true);
      await dispatchRequest(
        fetchPaymentHistoryMore(preparePaymentHistoryRequest(params)),
      );
      setIsMoreLoading(false);
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
      <PaymentsHistoryTable
        isMoreLoading={isMoreLoading}
        onChangePage={handleChangePage}
        onSort={handleChangeSort}
        isLoading={loading && !data}
        overlayLoading={isSortLoading}
        data={data}
        defaultParams={PaymentHistoryDefaultParams}
      />
    </Box>
  );
};
