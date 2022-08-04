import { Box, Typography } from '@material-ui/core';
import { Preloader, VirtualTable } from 'ui';

import { Filters } from './components/Filters';
import { t } from 'common';
import { usePaymentHistoryTable } from './hooks/usePaymentHistoryTable';
import { useStyles } from './PaymentHistoryTableStyles';

export const PaymentsHistoryTable = () => {
  const classes = useStyles();

  const {
    columns,
    hasMore,
    loading,
    loadMore,
    paymentType,
    rows,
    setPaymentType,
    setTimeframe,
    timeframe,
  } = usePaymentHistoryTable();

  const preloader = loading ? (
    <Preloader className={classes.preloader} />
  ) : null;

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={2} className={classes.top}>
        <Typography variant="h5" className={classes.title}>
          {t('account.payment-table.title')}
        </Typography>
        <Filters
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          setTimeframe={setTimeframe}
          timeframe={timeframe}
        />
      </Box>
      <VirtualTable
        cols={columns}
        emptyMessage={t('account.payment-table.empty')}
        isMoreRowsAvailable={hasMore}
        loading={loading}
        minWidth={650}
        onChangePage={loadMore}
        preloader={preloader}
        rows={rows}
      />
    </Box>
  );
};
