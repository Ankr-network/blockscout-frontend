import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useCallback, useMemo } from 'react';
import { Spinner } from 'ui';
import { LoadableButton } from 'uiKit/LoadableButton';
import { PaymentHistoryHeadCell } from './components/PaymentHistoryHeadCell';
import { PaymentHistoryRow } from './components/PaymentHistoryRow';
import { PaymentsHistoryTableProps } from './PaymentsHistoryTableProps';
import {
  PaymentHistoryTableContext,
  usePaymentHistoryTableUtils,
} from './PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export const PaymentsHistoryTable = ({
  data,
  onChangePage,
  onSort,
  isMoreLoading,
  isLoading,
  overlayLoading,
  defaultParams,
}: PaymentsHistoryTableProps) => {
  const classes = useStyles();

  const tableUtils = usePaymentHistoryTableUtils(defaultParams, { onSort });

  const handleChangePage = useCallback(() => {
    if (onChangePage) {
      tableUtils.setTableParams({ page: tableUtils.tableParams.page + 1 });
      onChangePage({
        ...tableUtils.tableParams,
        page: tableUtils.tableParams.page + 1,
      });
    }
  }, [onChangePage, tableUtils]);

  const rowsRendered = useMemo(
    () => data?.data.map(row => <PaymentHistoryRow key={row.id} data={row} />),
    [data?.data],
  );

  if (isLoading) {
    return (
      <Box position="relative" height={370}>
        <Spinner />
      </Box>
    );
  }

  return (
    <PaymentHistoryTableContext.Provider value={tableUtils}>
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        {overlayLoading && <div className={classes.overlayLoader} />}
        <Box component={Table} minWidth={600}>
          <TableHead className={classes.thead}>
            <TableRow>
              <PaymentHistoryHeadCell
                field="date"
                label="account.payment-table.head.col-1"
                isSortable
              />
              <PaymentHistoryHeadCell
                field="direction"
                label="account.payment-table.head.col-2"
              />
              <PaymentHistoryHeadCell
                field="amountUsd"
                label="account.payment-table.head.col-3"
                isSortable
                isNumeric
              />
              <PaymentHistoryHeadCell
                field="amountAnkr"
                label="account.payment-table.head.col-4"
                isSortable
                isNumeric
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {rowsRendered}
            {(tableUtils.tableParams.page < (data?.totalPages || 0) ||
              isMoreLoading) && (
              <TableRow className={classes.row}>
                <TableCell align="center" colSpan={4}>
                  <LoadableButton
                    loading={isMoreLoading}
                    disabled={isMoreLoading}
                    className={classes.moreBtn}
                    onClick={handleChangePage}
                    variant="text"
                  >
                    {t('account.payment-table.more')}
                  </LoadableButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Box>
      </TableContainer>
    </PaymentHistoryTableContext.Provider>
  );
};
