import { TableCell, TableRow } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'common';
import { PaymentHistoryRowType } from '../../PaymentsHistoryTableProps';
import {
  formatPaymentHistoryAmount,
  getPaymentHistoryItemDirection,
  getPaymentHistoryItemSign,
  PAYMENT_HISTORY_TYPE,
} from '../../PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export interface PaymentHistoryRowProps {
  data: PaymentHistoryRowType;
}

export const PaymentHistoryRow = ({
  data: { timestamp, type, amountUsd, amountAnkr },
}: PaymentHistoryRowProps) => {
  const classes = useStyles();

  const direction = getPaymentHistoryItemDirection(type);
  const sign = getPaymentHistoryItemSign(direction);

  return (
    <TableRow className={classes.row}>
      <TableCell padding="none" className={classes.cell}>
        {t('account.payment-table.date-time', {
          value: new Date(Number(timestamp)),
        })}
      </TableCell>
      <TableCell padding="none" className={classes.cell}>
        {PAYMENT_HISTORY_TYPE[type] || type}
      </TableCell>
      <TableCell
        align="right"
        padding="none"
        className={classNames(classes.cell, classes.cellBold, {
          [classes.cellTopUp]: direction,
        })}
      >
        {sign}${formatPaymentHistoryAmount(amountUsd)}
      </TableCell>
      <TableCell
        align="right"
        padding="none"
        className={classNames(classes.cell, classes.cellBold, {
          [classes.cellTopUp]: direction,
        })}
      >
        {sign}
        {formatPaymentHistoryAmount(amountAnkr)}
      </TableCell>
    </TableRow>
  );
};
