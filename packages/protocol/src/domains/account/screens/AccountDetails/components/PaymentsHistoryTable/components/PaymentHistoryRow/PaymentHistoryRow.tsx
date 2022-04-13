import { TableCell, TableRow } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'common';
import { PaymentHistoryRowType } from '../../PaymentsHistoryTableProps';
import { getPaymentHistoryItemSign } from '../../PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export interface PaymentHistoryRowProps {
  data: PaymentHistoryRowType;
}

export const PaymentHistoryRow = ({
  data: { date, direction, paymentType, amountUsd, amountAnkr },
}: PaymentHistoryRowProps) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.row}>
      <TableCell padding="none" className={classes.cell}>
        {t('account.payment-table.date-time', { value: new Date(date) })}
      </TableCell>
      <TableCell padding="none" className={classes.cell}>
        {paymentType}
      </TableCell>
      <TableCell
        align="right"
        padding="none"
        className={classNames(classes.cell, classes.cellBold, {
          [classes.cellTopUp]: direction === 'income',
        })}
      >
        {direction === 'income' ? '+' : '-'}${amountUsd}
      </TableCell>
      <TableCell
        align="right"
        padding="none"
        className={classNames(classes.cell, classes.cellBold, {
          [classes.cellTopUp]: direction === 'income',
        })}
      >
        {getPaymentHistoryItemSign(direction)}
        {amountAnkr}
      </TableCell>
    </TableRow>
  );
};
