import { useMemo } from 'react';

import { HeadRow } from '../HeadRow';
import { TableRow } from '../TableRow';
import { UsageHistoryData } from 'domains/dashboard/store/types';
import { formatData } from '../../utils/formatData';
import { useTableSyles } from './TableStyles';

export interface TableProps {
  data: UsageHistoryData[];
}

export const Table = ({ data }: TableProps) => {
  const { classes } = useTableSyles();

  const formatted = useMemo(() => formatData(data), [data]);

  return (
    <div className={classes.root}>
      <HeadRow />
      {formatted.map(item => (
        <TableRow data={item} key={item.month} />
      ))}
    </div>
  );
};
