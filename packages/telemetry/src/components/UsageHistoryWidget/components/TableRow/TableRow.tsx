import { FormattedHistoryData } from '../../types';
import { useTableRowStyles } from './TableRowStyles';

export interface TableRowProps {
  data: FormattedHistoryData;
}

export const TableRow = ({ data }: TableRowProps) => {
  const { isFirst, length, month, opacity, formattedCallsValue } = data;

  const { classes } = useTableRowStyles({ length, isFirst, opacity });

  return (
    <div className={classes.row}>
      <div className={classes.cell}>{month}</div>
      <div className={classes.cell}>{formattedCallsValue}</div>
      <div className={classes.cell}>
        <div className={classes.line} />
      </div>
    </div>
  );
};
