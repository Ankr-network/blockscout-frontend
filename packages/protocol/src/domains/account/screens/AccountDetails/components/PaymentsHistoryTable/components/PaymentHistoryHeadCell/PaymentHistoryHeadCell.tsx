import { capitalize, TableCell, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'common';
import { PaymentHistoryRowType } from '../../PaymentsHistoryTableProps';
import {
  getPaymentHistorySortArrow,
  usePaymentHistoryContext,
} from '../../PaymentsHistoryTableUtils';
import { useStyles } from './useStyles';

export interface PaymentHistoryHeadCellProps {
  field: keyof PaymentHistoryRowType;
  label: string;
  isNumeric?: boolean;
  isSortable?: boolean;
}

export const PaymentHistoryHeadCell = ({
  field,
  label,
  isNumeric,
  isSortable,
}: PaymentHistoryHeadCellProps) => {
  const classes = useStyles();
  const tableUtils = usePaymentHistoryContext();

  return (
    <TableCell
      padding="none"
      className={classNames(classes.cell, classes.cellThead)}
    >
      <Typography
        data-field={field}
        data-direction={field}
        onClick={isSortable ? tableUtils.handleSort : undefined}
        variant="body2"
        align={isNumeric ? 'right' : 'left'}
        color="textSecondary"
        className={classNames(classes.theadText, {
          [classes.theadClickable]: isSortable,
        })}
      >
        {capitalize(t(label))}
        &nbsp;
        {tableUtils.tableParams.order_by === field &&
          getPaymentHistorySortArrow(tableUtils.tableParams.order)}
      </Typography>
    </TableCell>
  );
};
