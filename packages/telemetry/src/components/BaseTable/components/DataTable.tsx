import { useTableWidgetStyles } from '../../../utils/TableWidgetStyles';
import { BaseTableData } from '../../../types';
import { DataTableItem } from './DataTableItem';

interface DataTableProps {
  data: BaseTableData[];
}

export const DataTable = ({ data }: DataTableProps): JSX.Element => {
  const { classes } = useTableWidgetStyles();

  return (
    <>
      {data.map(({ label, value }, idx) => (
        <div key={idx} className={classes.row}>
          <DataTableItem longText value={label} />
          <DataTableItem value={value} />
        </div>
      ))}
    </>
  );
};
