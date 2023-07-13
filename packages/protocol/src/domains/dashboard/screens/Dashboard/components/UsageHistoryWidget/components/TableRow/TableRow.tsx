import { FormattedHistoryData } from '../../types';
import { getText } from '../../utils/text';
import { useTableRowStyles } from './TableRowStyles';

export interface TableRowProps {
  data: FormattedHistoryData;
}

export const TableRow = ({ data }: TableRowProps) => {
  const { calls, isFirst, length, month, opacity } = data;

  const { classes } = useTableRowStyles({ length, isFirst, opacity });

  return (
    <div className={classes.row}>
      <div className={classes.cell}>{month}</div>
      <div className={classes.cell}>{getText('calls-number', { calls })}</div>
      <div className={classes.cell}>
        <div className={classes.line} />
      </div>
    </div>
  );
};
