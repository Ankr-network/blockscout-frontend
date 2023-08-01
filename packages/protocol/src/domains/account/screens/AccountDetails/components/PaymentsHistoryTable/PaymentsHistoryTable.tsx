import { Box, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Preloader } from 'uiKit/Preloader';
import { VirtualTable } from 'uiKit/VirtualTable';
import { useUpdatePaymentHistory } from 'domains/account/hooks/useUpdatePaymentHistory';

import { Filters } from './components/Filters';
import { usePaymentHistoryTable } from './hooks/usePaymentHistoryTable';
import { useStyles } from './PaymentHistoryTableStyles';


export const PaymentsHistoryTable = () => {
  const { classes } = useStyles();

  const {
    columns,
    hasMore,
    initializing,
    isLoading,
    loadMore,
    paymentType,
    rows,
    setPaymentType,
    setTimeframe,
    timeframe,
  } = usePaymentHistoryTable();

  useUpdatePaymentHistory(timeframe, paymentType);

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
        initializing={initializing}
        isMoreRowsAvailable={hasMore}
        loading={isLoading}
        minWidth={650}
        onChangePage={loadMore}
        preloader={<Preloader className={classes.preloader} />}
        rows={rows}
      />
    </Box>
  );
};
